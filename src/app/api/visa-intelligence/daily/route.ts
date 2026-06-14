import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { countries, getOfficialVisaInformationUrl } from "@/lib/visa-data";

export const dynamic = "force-dynamic";

type ExistingSource = {
  id: string;
  last_content_hash: string | null;
};

async function hashContent(content: string) {
  const normalized = content.replace(/\s+/g, " ").trim().slice(0, 220000);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function fetchSnapshot(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "NomadVisaRadarBot/1.0 official-source-monitor",
      },
    });
    const text = await response.text();
    const contentHash = response.ok ? await hashContent(text) : null;

    return {
      ok: response.ok,
      status: response.status,
      contentHash,
      error: response.ok ? null : `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      contentHash: null,
      error: error instanceof Error ? error.message : "Fetch failed",
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkCountrySource(
  supabase: SupabaseClient | null,
  country: (typeof countries)[number],
  checkedAt: string,
) {
  const sourceUrl = getOfficialVisaInformationUrl(country);
  const snapshot = await fetchSnapshot(sourceUrl);

  if (!supabase) {
    return {
      country: country.countryName,
      changed: false,
      ok: snapshot.ok,
      sourceUrl,
    };
  }

  const { data: existing } = await supabase
    .from("sources")
    .select("id,last_content_hash")
    .eq("source_url", sourceUrl)
    .limit(1)
    .maybeSingle<ExistingSource>();

  const changed = Boolean(
    snapshot.contentHash &&
      existing?.last_content_hash &&
      existing.last_content_hash !== snapshot.contentHash,
  );
  const needsReview = changed || !snapshot.ok;

  const sourcePayload = {
    source_name: `${country.countryName} official visa information page`,
    source_url: sourceUrl,
    source_type: "official",
    confidence_score: snapshot.ok ? 90 : 50,
    last_checked: checkedAt,
    last_content_hash: snapshot.contentHash,
    last_status_code: snapshot.status,
    last_error: snapshot.error,
    last_changed_at: changed ? checkedAt : undefined,
  };

  if (existing?.id) {
    await supabase.from("sources").update(sourcePayload).eq("id", existing.id);
  } else {
    await supabase.from("sources").insert({
      ...sourcePayload,
      last_changed_at: checkedAt,
    });
  }

  if (needsReview) {
    await supabase.from("editor_reviews").insert({
      country_name: country.countryName,
      source_url: sourceUrl,
      proposed_change: changed
        ? `Official visa information page content changed for ${country.visaProgramName}. Human review required before publication.`
        : `Official visa information page could not be fetched for ${country.visaProgramName}: ${snapshot.error}. Human review required.`,
      confidence_score: snapshot.ok ? 88 : 45,
      status: "pending",
      checked_at: checkedAt,
    });
  }

  return {
    country: country.countryName,
    changed,
    ok: snapshot.ok,
    sourceUrl,
  };
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
) {
  const results: R[] = [];

  for (let index = 0; index < items.length; index += limit) {
    const chunk = items.slice(index, index + limit);
    results.push(...(await Promise.all(chunk.map(worker))));
  }

  return results;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Cron secret is not configured" },
      { status: 500 },
    );
  }

  if (expected && authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkedAt = new Date().toISOString();
  const supabase = getSupabaseServiceClient();
  const results = await runWithConcurrency(countries, 5, (country) =>
    checkCountrySource(supabase, country, checkedAt),
  );

  return NextResponse.json({
    ok: true,
    checked_at: checkedAt,
    official_pages_checked: results.length,
    changed_pages: results.filter((result) => result.changed).length,
    failed_pages: results.filter((result) => !result.ok).length,
    auto_published: false,
  });
}
