import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const { error } = await supabase.from("newsletter_subscribers").upsert({
    email: parsed.data.email.trim().toLowerCase(),
    status: "subscribed",
    subscribed_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not save newsletter subscription" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
