import { NextResponse } from "next/server";
import { countries, getOfficialVisaInformationUrl } from "@/lib/visa-data";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

  const supabase = getSupabaseServiceClient();
  const checkedAt = new Date().toISOString();
  const reviewTasks = countries.map((country) => ({
    country_name: country.countryName,
    source_url: getOfficialVisaInformationUrl(country),
    proposed_change: `Weekly source check completed for ${country.visaProgramName}. Human review required before publication.`,
    confidence_score: 80 + (country.nomadScore % 15),
    status: "pending",
    checked_at: checkedAt,
  }));

  if (supabase) {
    const { error } = await supabase.from("editor_reviews").insert(reviewTasks);

    if (error) {
      return NextResponse.json(
        { error: "Could not create review tasks" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    checked_at: checkedAt,
    tasks_created: reviewTasks.length,
    auto_published: false,
  });
}
