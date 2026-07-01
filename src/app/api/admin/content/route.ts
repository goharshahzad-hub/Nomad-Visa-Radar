import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAuthContext } from "@/lib/auth";
import { adminEmail } from "@/lib/email";
import {
  getAdminContentEntries,
  managedEntryInputSchema,
  managedEntryToRow,
  rowToManagedEntry,
} from "@/lib/managed-content";

export const dynamic = "force-dynamic";

async function getAdminClient() {
  const auth = await getAuthContext();

  if (!auth.configured || !auth.supabase) {
    return { error: NextResponse.json({ error: "Content database is not configured" }, { status: 503 }) };
  }
  if (!auth.user) {
    return { error: NextResponse.json({ error: "Sign in required" }, { status: 401 }) };
  }
  if (auth.user.email?.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return { error: NextResponse.json({ error: "Administrator access required" }, { status: 403 }) };
  }

  return {
    client: auth.supabase,
    userId: auth.user.id,
  };
}

function refreshPublishedContent(slug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
  if (slug?.startsWith("site-")) revalidatePath(`/sections/${slug.slice(5)}`);
}

export async function GET() {
  const admin = await getAdminClient();
  if ("error" in admin) return admin.error;

  try {
    const entries = await getAdminContentEntries(admin.client);
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Admin content load failed", error);
    return NextResponse.json({ error: "Could not load the content library" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const admin = await getAdminClient();
  if ("error" in admin) return admin.error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = managedEntryInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete the required content fields", issues: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  const row = managedEntryToRow(parsed.data, admin.userId);
  const { data, error } = await admin.client
    .from("blog_posts")
    .upsert(row, { onConflict: "slug" })
    .select("id,slug,title,excerpt,content,category,status,published_at,created_at,updated_at")
    .single();

  if (error) {
    console.error("Admin content save failed", error);
    return NextResponse.json({ error: "Could not save this content" }, { status: 503 });
  }

  refreshPublishedContent(data.slug);
  return NextResponse.json({ entry: rowToManagedEntry(data) });
}

const deleteSchema = z.object({ slug: z.string().regex(/^[a-z0-9-]+$/).min(3).max(120) });

export async function DELETE(request: Request) {
  const admin = await getAdminClient();
  if ("error" in admin) return admin.error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid content identifier" }, { status: 400 });
  }

  const { error } = await admin.client.from("blog_posts").delete().eq("slug", parsed.data.slug);
  if (error) {
    console.error("Admin content delete failed", error);
    return NextResponse.json({ error: "Could not delete this content" }, { status: 503 });
  }

  refreshPublishedContent(parsed.data.slug);
  return NextResponse.json({ ok: true });
}
