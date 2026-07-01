"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive,
  ExternalLink,
  FilePlus2,
  FileText,
  ImageIcon,
  LayoutTemplate,
  LoaderCircle,
  Plus,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ManagedEntry, ManagedEntryInput, ManagedPayload, ManagedStatus } from "@/lib/managed-content";
import { slugify } from "@/lib/utils";

type StudioTab = "blog" | "section";
type BlogPayload = Extract<ManagedPayload, { kind: "blog" }>;
type SectionPayload = Extract<ManagedPayload, { kind: "section" }>;

function newEntry(kind: StudioTab): ManagedEntry {
  const now = new Date().toISOString();
  const payload: ManagedPayload = kind === "blog"
    ? {
        kind: "blog",
        author: "Gohar Shahzad",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Digital nomad visa planning guide",
        keywords: [],
        sections: [{ heading: "What readers need to know", body: "Write the practical answer, then explain how readers can verify it." }],
        faq: [],
        sources: [],
      }
    : {
        kind: "section",
        key: "new-section",
        body: "Write the site section content here.",
        image: "",
        imageAlt: "",
      };

  return {
    id: `new:${kind}:${Date.now()}`,
    slug: kind === "blog" ? "new-visa-guide" : "site-new-section",
    title: kind === "blog" ? "New visa guide" : "New site section",
    excerpt: kind === "blog" ? "A practical, source-backed guide for remote workers comparing visa options." : "Editable site section",
    category: kind === "blog" ? "Requirements" : "__site_section__",
    status: "draft",
    payload,
    source: "managed",
    isBuiltIn: false,
    publishedAt: null,
    updatedAt: now,
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-sm font-medium">{children}</span>;
}

function IconRemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="icon" onClick={onClick} aria-label={label} title={label}>
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}

export function ContentStudio() {
  const [entries, setEntries] = useState<ManagedEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ManagedEntry | null>(null);
  const [tab, setTab] = useState<StudioTab>("blog");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      const result = (await response.json()) as { entries?: ManagedEntry[]; error?: string };
      if (!response.ok || !result.entries) throw new Error(result.error || "Could not load content");
      setEntries(result.entries);
      const first = result.entries.find((entry) => entry.payload.kind === "blog") ?? result.entries[0];
      if (first) {
        setSelectedId(first.id);
        setDraft(structuredClone(first));
      }
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  const visibleEntries = useMemo(
    () => entries.filter((entry) => entry.payload.kind === tab),
    [entries, tab],
  );
  const publicHref = draft?.payload.kind === "blog"
    ? `/blog/${draft.slug}`
    : draft?.payload.key === "about-intro"
      ? "/about"
      : draft?.payload.key === "home-hero" || draft?.payload.key === "footer-description"
        ? "/"
        : draft?.payload.kind === "section"
          ? `/sections/${draft.payload.key}`
          : null;

  function selectEntry(entry: ManagedEntry) {
    setSelectedId(entry.id);
    setDraft(structuredClone(entry));
  }

  function switchTab(nextTab: StudioTab) {
    setTab(nextTab);
    const first = entries.find((entry) => entry.payload.kind === nextTab);
    if (first) selectEntry(first);
  }

  function addNew() {
    const entry = newEntry(tab);
    setSelectedId(entry.id);
    setDraft(entry);
  }

  function updateDraft(patch: Partial<ManagedEntry>) {
    setDraft((current) => current ? { ...current, ...patch } : current);
  }

  function updatePayload(payload: ManagedPayload) {
    setDraft((current) => current ? { ...current, payload } : current);
  }

  function mutateBlogPayload(update: (payload: BlogPayload) => BlogPayload) {
    setDraft((current) => {
      if (!current || current.payload.kind !== "blog") return current;
      return { ...current, payload: update(current.payload) };
    });
  }

  function mutateSectionPayload(update: (payload: SectionPayload) => SectionPayload) {
    setDraft((current) => {
      if (!current || current.payload.kind !== "section") return current;
      return { ...current, payload: update(current.payload) };
    });
  }

  async function save(status: ManagedStatus = draft?.status ?? "draft") {
    if (!draft) return;
    setSaving(true);
    try {
      const payload: ManagedEntryInput = {
        id: draft.id.startsWith("new:") || draft.id.startsWith("built-in:") ? undefined : draft.id,
        slug: draft.payload.kind === "section" ? `site-${draft.payload.key}` : draft.slug,
        title: draft.title,
        excerpt: draft.excerpt,
        category: draft.category,
        status,
        payload: draft.payload,
      };
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { entry?: ManagedEntry; error?: string };
      if (!response.ok || !result.entry) throw new Error(result.error || "Could not save content");

      setEntries((current) => {
        const withoutSameSlug = current.filter((entry) => entry.slug !== result.entry?.slug);
        return [result.entry as ManagedEntry, ...withoutSameSlug];
      });
      setSelectedId(result.entry.id);
      setDraft(structuredClone(result.entry));
      toast.success(status === "published" ? "Published to the website." : "Content saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save content");
    } finally {
      setSaving(false);
    }
  }

  async function removeEntry() {
    if (!draft) return;
    if (draft.isBuiltIn) {
      if (!window.confirm("Archive this built-in item and hide it from the public site?")) return;
      await save("archived");
      return;
    }
    if (!window.confirm("Delete this content permanently?")) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: draft.slug }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not delete content");

      const remaining = entries.filter((entry) => entry.id !== selectedId);
      setEntries(remaining);
      const next = remaining.find((entry) => entry.payload.kind === tab) ?? null;
      setSelectedId(next?.id ?? null);
      setDraft(next ? structuredClone(next) : null);
      toast.success("Content deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete content");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex min-h-96 items-center justify-center"><LoaderCircle className="h-7 w-7 animate-spin text-primary" /></div>;
  }

  if (loadError) {
    return (
      <div className="border-y py-14 text-center">
        <p className="font-semibold">The content library is unavailable.</p>
        <p className="mt-2 text-sm text-muted-foreground">{loadError}</p>
        <Button className="mt-5" onClick={() => void loadEntries()}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-y py-3">
        <div className="inline-flex rounded-md border bg-muted p-1" aria-label="Content type">
          <button
            type="button"
            onClick={() => switchTab("blog")}
            className={`flex h-9 items-center gap-2 rounded px-3 text-sm font-medium ${tab === "blog" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
          >
            <FileText className="h-4 w-4" /> Blog articles
          </button>
          <button
            type="button"
            onClick={() => switchTab("section")}
            className={`flex h-9 items-center gap-2 rounded px-3 text-sm font-medium ${tab === "section" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
          >
            <LayoutTemplate className="h-4 w-4" /> Site sections
          </button>
        </div>
        <Button onClick={addNew}><FilePlus2 className="h-4 w-4" /> Add {tab === "blog" ? "article" : "section"}</Button>
      </div>

      <div className="grid min-h-[720px] lg:grid-cols-[290px_1fr]">
        <aside className="border-b py-4 lg:border-b-0 lg:border-r lg:pr-4">
          <div className="space-y-1">
            {visibleEntries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => selectEntry(entry)}
                className={`w-full rounded-md px-3 py-3 text-left transition ${selectedId === entry.id ? "bg-muted" : "hover:bg-muted/60"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="line-clamp-2 text-sm font-semibold leading-5">{entry.title}</span>
                  <Badge variant={entry.status === "published" ? "success" : entry.status === "archived" ? "outline" : "gold"}>
                    {entry.status}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">/{entry.slug}</p>
              </button>
            ))}
          </div>
        </aside>

        <main className="py-6 lg:pl-7">
          {!draft ? (
            <div className="py-20 text-center text-muted-foreground">Choose an item or add new content.</div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); void save(); }} className="space-y-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{draft.payload.kind === "blog" ? "Article editor" : "Section editor"}</Badge>
                    {draft.isBuiltIn && <Badge variant="secondary">Built in</Badge>}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold">{draft.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Last update {new Date(draft.updatedAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {draft.status === "published" && publicHref && (
                    <a href={publicHref} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-muted">
                      <ExternalLink className="h-4 w-4" /> View
                    </a>
                  )}
                  <Button type="button" variant="outline" onClick={() => void save("draft")} disabled={saving}><Save className="h-4 w-4" /> Save draft</Button>
                  <Button type="button" onClick={() => void save("published")} disabled={saving}><Send className="h-4 w-4" /> Publish</Button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2"><FieldLabel>Title</FieldLabel><Input value={draft.title} onChange={(event) => updateDraft({ title: event.target.value })} required /></label>
                {draft.payload.kind === "blog" ? (
                  <>
                    <label><FieldLabel>URL slug</FieldLabel><Input value={draft.slug} onChange={(event) => updateDraft({ slug: slugify(event.target.value) })} required /></label>
                    <label><FieldLabel>Category</FieldLabel><Input value={draft.category} onChange={(event) => updateDraft({ category: event.target.value })} required /></label>
                    <label className="sm:col-span-2"><FieldLabel>Search and card summary</FieldLabel><Textarea value={draft.excerpt} onChange={(event) => updateDraft({ excerpt: event.target.value })} className="min-h-24" required /></label>
                    <label><FieldLabel>Author</FieldLabel><Input value={draft.payload.author} onChange={(event) => mutateBlogPayload((payload) => ({ ...payload, author: event.target.value }))} required /></label>
                    <label><FieldLabel>Keywords, separated by commas</FieldLabel><Input value={draft.payload.keywords.join(", ")} onChange={(event) => mutateBlogPayload((payload) => ({ ...payload, keywords: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) }))} /></label>
                  </>
                ) : (
                  <>
                    <label><FieldLabel>Section key</FieldLabel><Input value={draft.payload.key} onChange={(event) => mutateSectionPayload((payload) => ({ ...payload, key: slugify(event.target.value) }))} required /></label>
                    <label><FieldLabel>Editor note</FieldLabel><Input value={draft.excerpt} onChange={(event) => updateDraft({ excerpt: event.target.value })} required /></label>
                    <label className="sm:col-span-2"><FieldLabel>Section content</FieldLabel><Textarea value={draft.payload.body} onChange={(event) => mutateSectionPayload((payload) => ({ ...payload, body: event.target.value }))} className="min-h-56" required /></label>
                  </>
                )}
              </div>

              <section className="border-y py-6">
                <div className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Image replacement</h3></div>
                <div className="mt-4 grid gap-5 md:grid-cols-[1fr_240px]">
                  <div className="space-y-4">
                    <label><FieldLabel>Image URL</FieldLabel><Input value={draft.payload.image} onChange={(event) => updatePayload({ ...draft.payload, image: event.target.value })} placeholder="https://..." /></label>
                    <label><FieldLabel>Accessible image description</FieldLabel><Input value={draft.payload.imageAlt} onChange={(event) => updatePayload({ ...draft.payload, imageAlt: event.target.value })} /></label>
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-md border bg-muted">
                    {draft.payload.image ? <div role="img" aria-label={draft.payload.imageAlt || "Image preview"} className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${draft.payload.image})` }} /> : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>}
                  </div>
                </div>
              </section>

              {draft.payload.kind === "blog" && (
                <>
                  <section>
                    <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Article sections</h3><Button type="button" variant="outline" size="sm" onClick={() => mutateBlogPayload((payload) => ({ ...payload, sections: [...payload.sections, { heading: "New section", body: "" }] }))}><Plus className="h-4 w-4" /> Add section</Button></div>
                    <div className="mt-4 divide-y border-y">
                      {draft.payload.sections.map((section, index) => (
                        <div key={`${index}-${section.heading}`} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto]">
                          <div className="space-y-3">
                            <Input value={section.heading} onChange={(event) => mutateBlogPayload((payload) => { const sections = [...payload.sections]; sections[index] = { ...section, heading: event.target.value }; return { ...payload, sections }; })} placeholder="Section heading" />
                            <Textarea value={section.body} onChange={(event) => mutateBlogPayload((payload) => { const sections = [...payload.sections]; sections[index] = { ...section, body: event.target.value }; return { ...payload, sections }; })} className="min-h-40" placeholder="Useful, specific section content" />
                            <Textarea value={(section.bullets ?? []).join("\n")} onChange={(event) => mutateBlogPayload((payload) => { const sections = [...payload.sections]; sections[index] = { ...section, bullets: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) }; return { ...payload, sections }; })} className="min-h-20" placeholder="Optional bullets, one per line" />
                          </div>
                          <IconRemoveButton label="Remove section" onClick={() => mutateBlogPayload((payload) => ({ ...payload, sections: payload.sections.filter((_, itemIndex) => itemIndex !== index) }))} />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Frequently asked questions</h3><Button type="button" variant="outline" size="sm" onClick={() => mutateBlogPayload((payload) => ({ ...payload, faq: [...payload.faq, { question: "", answer: "" }] }))}><Plus className="h-4 w-4" /> Add FAQ</Button></div>
                    <div className="mt-4 space-y-3">
                      {draft.payload.faq.map((item, index) => (
                        <div key={index} className="grid gap-3 border-t pt-4 sm:grid-cols-[1fr_1fr_auto]">
                          <Input value={item.question} onChange={(event) => mutateBlogPayload((payload) => { const faq = [...payload.faq]; faq[index] = { ...item, question: event.target.value }; return { ...payload, faq }; })} placeholder="Question" />
                          <Textarea value={item.answer} onChange={(event) => mutateBlogPayload((payload) => { const faq = [...payload.faq]; faq[index] = { ...item, answer: event.target.value }; return { ...payload, faq }; })} className="min-h-20" placeholder="Clear answer" />
                          <IconRemoveButton label="Remove FAQ" onClick={() => mutateBlogPayload((payload) => ({ ...payload, faq: payload.faq.filter((_, itemIndex) => itemIndex !== index) }))} />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Official sources</h3><Button type="button" variant="outline" size="sm" onClick={() => mutateBlogPayload((payload) => ({ ...payload, sources: [...payload.sources, { label: "", url: "" }] }))}><Plus className="h-4 w-4" /> Add source</Button></div>
                    <div className="mt-4 space-y-3">
                      {draft.payload.sources.map((source, index) => (
                        <div key={index} className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr_auto]">
                          <Input value={source.label} onChange={(event) => mutateBlogPayload((payload) => { const sources = [...payload.sources]; sources[index] = { ...source, label: event.target.value }; return { ...payload, sources }; })} placeholder="Government source name" />
                          <Input value={source.url} onChange={(event) => mutateBlogPayload((payload) => { const sources = [...payload.sources]; sources[index] = { ...source, url: event.target.value }; return { ...payload, sources }; })} placeholder="https://official-source..." />
                          <IconRemoveButton label="Remove source" onClick={() => mutateBlogPayload((payload) => ({ ...payload, sources: payload.sources.filter((_, itemIndex) => itemIndex !== index) }))} />
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                <Button type="button" variant="ghost" onClick={() => void removeEntry()} disabled={saving} className="text-destructive"><Trash2 className="h-4 w-4" /> {draft.isBuiltIn ? "Archive" : "Delete"}</Button>
                <div className="flex gap-2">
                  {draft.status === "published" && <Button type="button" variant="outline" onClick={() => void save("archived")} disabled={saving}><Archive className="h-4 w-4" /> Unpublish</Button>}
                  <Button type="submit" disabled={saving}>{saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes</Button>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
