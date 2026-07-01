import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { siteConfig } from "@/lib/site";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { blogPosts as builtInBlogPosts, type BlogPost } from "@/lib/visa-data";

export const managedStatusSchema = z.enum(["draft", "review", "published", "archived"]);

const blogPayloadSchema = z.object({
  kind: z.literal("blog"),
  author: z.string().trim().min(1).max(100),
  image: z.string().url(),
  imageAlt: z.string().trim().min(1).max(180),
  keywords: z.array(z.string().trim().min(1).max(80)).max(20),
  sections: z.array(z.object({
    heading: z.string().trim().min(1).max(180),
    body: z.string().trim().min(1).max(12000),
    bullets: z.array(z.string().trim().min(1).max(500)).max(20).optional(),
  })).min(1).max(30),
  faq: z.array(z.object({
    question: z.string().trim().min(1).max(300),
    answer: z.string().trim().min(1).max(2000),
  })).max(20),
  sources: z.array(z.object({
    label: z.string().trim().min(1).max(200),
    url: z.string().url(),
  })).max(30),
});

const sectionPayloadSchema = z.object({
  kind: z.literal("section"),
  key: z.string().regex(/^[a-z0-9-]+$/).max(80),
  body: z.string().trim().min(1).max(12000),
  image: z.string().url().or(z.literal("")),
  imageAlt: z.string().trim().max(180),
});

export const managedPayloadSchema = z.discriminatedUnion("kind", [
  blogPayloadSchema,
  sectionPayloadSchema,
]);

export const managedEntryInputSchema = z.object({
  id: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(3).max(120),
  title: z.string().trim().min(3).max(180),
  excerpt: z.string().trim().min(10).max(500),
  category: z.string().trim().min(2).max(80),
  status: managedStatusSchema,
  payload: managedPayloadSchema,
});

export type ManagedPayload = z.infer<typeof managedPayloadSchema>;
export type ManagedEntryInput = z.infer<typeof managedEntryInputSchema>;
export type ManagedStatus = z.infer<typeof managedStatusSchema>;

export type ManagedEntry = ManagedEntryInput & {
  id: string;
  source: "built-in" | "managed";
  isBuiltIn: boolean;
  publishedAt: string | null;
  updatedAt: string;
};

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: ManagedStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const defaultSiteSections = [
  {
    key: "home-hero",
    title: "Search Digital Nomad Visa Requirements Worldwide",
    body: "Compare income thresholds, taxes, dependents, processing speed, and lifestyle scores across active remote worker and freelancer visa programs.",
  },
  {
    key: "about-intro",
    title: "Visa intelligence for careful remote moves",
    body: "Nomad Visa Radar is an independent research site for remote workers, freelancers, founders, families, and relocation teams comparing digital nomad visas and remote-work residence routes.\n\nOur goal is to make the first stage of research calmer and more useful: which countries have relevant routes, what evidence usually matters, where official instructions live, and which details need extra checking before a decision.",
  },
  {
    key: "footer-description",
    title: "Footer description",
    body: "Visa intelligence for remote workers, relocation teams, and publishers who need official-source review before guidance goes live.",
  },
] as const;

function builtInBlogPayload(post: BlogPost): ManagedPayload {
  return {
    kind: "blog",
    author: post.author,
    image: post.image,
    imageAlt: post.imageAlt,
    keywords: post.keywords,
    sections: post.sections,
    faq: post.faq,
    sources: post.sources ?? [],
  };
}

function parsePayload(row: BlogRow): ManagedPayload {
  try {
    const parsed = managedPayloadSchema.safeParse(JSON.parse(row.content));
    if (parsed.success) return parsed.data;
  } catch {
    // Legacy rows stored article text directly rather than the structured editor format.
  }

  return {
    kind: "blog",
    author: "Gohar Shahzad",
    image: siteConfig.socialImage,
    imageAlt: `${row.title} editorial guide`,
    keywords: [],
    sections: [{ heading: "Guide", body: row.content }],
    faq: [],
    sources: [],
  };
}

export function rowToManagedEntry(row: BlogRow): ManagedEntry {
  const payload = parsePayload(row);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    status: row.status,
    payload,
    source: "managed",
    isBuiltIn:
      builtInBlogPosts.some((post) => post.slug === row.slug) ||
      defaultSiteSections.some((section) => `site-${section.key}` === row.slug),
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

function builtInEntries(): ManagedEntry[] {
  const now = new Date().toISOString();
  const blogs = builtInBlogPosts.map((post) => ({
    id: `built-in:${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    status: "published" as const,
    payload: builtInBlogPayload(post),
    source: "built-in" as const,
    isBuiltIn: true,
    publishedAt: post.date,
    updatedAt: post.updated,
  }));
  const sections = defaultSiteSections.map((section) => ({
    id: `built-in:site-${section.key}`,
    slug: `site-${section.key}`,
    title: section.title,
    excerpt: `Editable ${section.key} site section`,
    category: "__site_section__",
    status: "published" as const,
    payload: {
      kind: "section" as const,
      key: section.key,
      body: section.body,
      image: "",
      imageAlt: "",
    },
    source: "built-in" as const,
    isBuiltIn: true,
    publishedAt: now,
    updatedAt: now,
  }));
  return [...blogs, ...sections];
}

async function queryRows(client: SupabaseClient, includeAllStatuses: boolean) {
  let query = client
    .from("blog_posts")
    .select("id,slug,title,excerpt,content,category,status,published_at,created_at,updated_at")
    .order("updated_at", { ascending: false });

  if (!includeAllStatuses) {
    query = query.in("status", ["published", "archived"]);
  }

  const { data, error } = await query.abortSignal(AbortSignal.timeout(2500));
  if (error) throw error;
  return (data ?? []) as BlogRow[];
}

export async function getAdminContentEntries(client: SupabaseClient) {
  const rows = await queryRows(client, true);
  const managed = rows.map(rowToManagedEntry);
  const managedBySlug = new Map(managed.map((entry) => [entry.slug, entry]));
  const defaults = builtInEntries().map((entry) => managedBySlug.get(entry.slug) ?? entry);
  const defaultSlugs = new Set(defaults.map((entry) => entry.slug));
  return [...defaults, ...managed.filter((entry) => !defaultSlugs.has(entry.slug))];
}

export function managedEntryToRow(input: ManagedEntryInput, authorId: string) {
  const isSection = input.payload.kind === "section";
  return {
    slug: input.payload.kind === "section" ? `site-${input.payload.key}` : input.slug,
    title: input.title,
    excerpt: input.excerpt,
    content: JSON.stringify(input.payload),
    category: isSection ? "__site_section__" : input.category,
    author_id: authorId,
    status: input.status,
    published_at: input.status === "published" ? new Date().toISOString() : null,
  };
}

function entryToBlogPost(entry: ManagedEntry): BlogPost | null {
  if (entry.payload.kind !== "blog") return null;
  const words = entry.payload.sections.reduce(
    (total, section) => total + section.body.split(/\s+/).length,
    0,
  );
  const published = entry.publishedAt ?? entry.updatedAt;
  return {
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    category: entry.category,
    author: entry.payload.author,
    date: published.slice(0, 10),
    updated: entry.updatedAt.slice(0, 10),
    readTime: `${Math.max(3, Math.ceil(words / 220))} min read`,
    image: entry.payload.image,
    imageAlt: entry.payload.imageAlt,
    keywords: entry.payload.keywords,
    sources: entry.payload.sources,
    sections: entry.payload.sections,
    faq: entry.payload.faq,
    managed: true,
  };
}

let contentUnavailableUntil = 0;

async function getPublicRows() {
  if (Date.now() < contentUnavailableUntil) return [] as BlogRow[];
  const client = getSupabaseServiceClient();
  if (!client) return [] as BlogRow[];

  try {
    return await queryRows(client, false);
  } catch (error) {
    contentUnavailableUntil = Date.now() + 60_000;
    console.warn("Managed content is temporarily unavailable; using built-in content", error);
    return [] as BlogRow[];
  }
}

export async function getPublicBlogPosts() {
  const rows = await getPublicRows();
  const managed = rows
    .filter((row) => row.category !== "__site_section__")
    .map(rowToManagedEntry);
  const managedBySlug = new Map(managed.map((entry) => [entry.slug, entry]));
  const merged = builtInBlogPosts.flatMap((post) => {
    const override = managedBySlug.get(post.slug);
    if (override?.status === "archived") return [];
    if (override?.status === "published") {
      const managedPost = entryToBlogPost(override);
      return managedPost ? [managedPost] : [post];
    }
    return [post];
  });
  const builtInSlugs = new Set(builtInBlogPosts.map((post) => post.slug));
  const additions = managed.flatMap((entry) => {
    if (builtInSlugs.has(entry.slug) || entry.status !== "published") return [];
    const post = entryToBlogPost(entry);
    return post ? [post] : [];
  });
  return [...additions, ...merged];
}

export async function getSiteSection(key: string) {
  const fallback = defaultSiteSections.find((section) => section.key === key);
  const rows = await getPublicRows();
  const row = rows.find((candidate) => candidate.slug === `site-${key}` && candidate.status === "published");
  const payload = row ? parsePayload(row) : null;

  if (payload?.kind === "section") {
    return { title: row?.title ?? fallback?.title ?? key, ...payload };
  }

  return fallback
    ? { title: fallback.title, kind: "section" as const, key, body: fallback.body, image: "", imageAlt: "" }
    : null;
}

export async function getPublicSiteSections() {
  const rows = await getPublicRows();
  return rows.flatMap((row) => {
    if (row.category !== "__site_section__" || row.status !== "published") return [];
    const payload = parsePayload(row);
    if (payload.kind !== "section") return [];
    return [{
      key: payload.key,
      title: row.title,
      body: payload.body,
      image: payload.image,
      imageAlt: payload.imageAlt,
      updatedAt: row.updated_at,
    }];
  });
}
