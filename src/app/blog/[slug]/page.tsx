import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ShareActions } from "@/components/share-actions";
import { getRichArticleReadTime, getRichBlogArticle } from "@/lib/blog-articles";
import { getPublicBlogPosts } from "@/lib/managed-content";
import { blogPosts, getAuthorProfile } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPublicBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) return {};

  const richArticle = post.managed ? undefined : getRichBlogArticle(slug);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: richArticle?.reviewedDate ?? post.updated,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPublicBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const authorProfile = getAuthorProfile(post.author);
  const richArticle = post.managed ? undefined : getRichBlogArticle(post.slug);
  const readTime = post.managed ? post.readTime : getRichArticleReadTime(post.slug, post.readTime);
  const sources = richArticle?.sources ?? post.sources ?? [];
  const faq = richArticle?.faq ?? post.faq;
  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: richArticle?.reviewedDate ?? post.updated,
    image: post.image,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Person",
      name: post.author,
      url: `${siteConfig.url}/author/${slugify(post.author)}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    citation: sources.map((source) => source.url),
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <article>
      <section className="border-b bg-muted/35">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <div className="flex flex-col justify-center">
            <Link href={`/blog/category/${slugify(post.category)}`} className="w-fit">
              <Badge variant="secondary">{post.category}</Badge>
            </Link>
            <h1 className="mt-5 text-3xl font-semibold tracking-normal sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <Link href={`/author/${slugify(post.author)}`} className="text-primary">
                {post.author}
              </Link>
              <span>Published {post.date}</span>
              <span>Updated {richArticle?.reviewedDate ?? post.updated}</span>
              <span>{readTime}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span key={keyword} className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                  {keyword}
                </span>
              ))}
            </div>
            <ShareActions
              title={post.title}
              text={post.excerpt}
              url={`${siteConfig.url}/blog/${post.slug}`}
              className="mt-6"
            />
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-lg border">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <Card className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Editorial note</p>
                <h2 className="mt-2 text-xl font-semibold">{authorProfile.role}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {authorProfile.reviewStandard}
                </p>
              </div>
              <Link
                href={`/author/${slugify(post.author)}`}
                className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View author profile
              </Link>
            </div>
          </Card>

          {richArticle ? (
            <>
              <Card className="border-primary/30 bg-primary/5 p-6">
                <p className="text-sm font-semibold text-primary">Direct answer</p>
                <p className="mt-3 text-lg leading-8">{richArticle.directAnswer}</p>
              </Card>

              <section>
                <h2 className="text-2xl font-semibold">Key takeaways</h2>
                <ul className="mt-4 space-y-3">
                  {richArticle.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-3 leading-7 text-muted-foreground">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">Quick facts</h2>
                <dl className="mt-4 divide-y rounded-lg border bg-card">
                  {richArticle.quickFacts.map((fact) => (
                    <div key={fact.label} className="grid gap-1 px-4 py-4 sm:grid-cols-[180px_1fr] sm:gap-5">
                      <dt className="text-sm font-medium">{fact.label}</dt>
                      <dd className="text-sm leading-6 text-muted-foreground">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <nav aria-label="Article contents" className="rounded-lg border bg-muted/35 p-5">
                <h2 className="font-semibold">In this guide</h2>
                <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {richArticle.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#${slugify(section.heading)}`}
                        className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        {index + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {richArticle.comparison && (
                <section>
                  <h2 className="text-2xl font-semibold">{richArticle.comparison.heading}</h2>
                  <div className="mt-4 overflow-x-auto rounded-lg border">
                    <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                      <thead className="bg-muted/70">
                        <tr>
                          {richArticle.comparison.headers.map((header) => (
                            <th key={header} className="border-b px-4 py-3 font-semibold">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {richArticle.comparison.rows.map((row) => (
                          <tr key={row.join("|")} className="border-b last:border-0">
                            {row.map((cell, index) => (
                              <td key={`${index}-${cell}`} className="px-4 py-4 align-top leading-6 text-muted-foreground first:font-medium first:text-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {richArticle.sections.map((section) => (
                <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
                  <h2 className="text-2xl font-semibold">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-8 text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 rounded-md border bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.callout && (
                    <aside className="mt-5 border-l-4 border-primary bg-primary/5 px-5 py-4">
                      <h3 className="font-semibold">{section.callout.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.callout.body}</p>
                    </aside>
                  )}
                </section>
              ))}

              <Card className="p-6">
                <h2 className="text-2xl font-semibold">Application checklist</h2>
                <ol className="mt-5 space-y-3">
                  {richArticle.checklist.map((item, index) => (
                    <li key={item} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </>
          ) : (
            post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold">{section.heading}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))
          )}
        </div>

        {sources.length > 0 && (
          <Card className="mt-10 p-6">
            <h2 className="text-2xl font-semibold">Official sources checked</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Visa rules can change by consulate, nationality, and filing date. Use these official pages before making an application decision.
            </p>
            <ul className="mt-5 space-y-3">
              {sources.map((source) => (
                <li key={source.url}>
                  <Link
                    href={source.url}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {source.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="mt-10 p-6">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-5 space-y-5">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-medium">{item.question}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-10 p-6">
          <h2 className="text-2xl font-semibold">Share this guide</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Send this article to a remote worker, teammate, or family member comparing visa options.
          </p>
          <ShareActions
            title={post.title}
            text={post.excerpt}
            url={`${siteConfig.url}/blog/${post.slug}`}
            className="mt-5"
          />
        </Card>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Related reading</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((related) => (
              <Card key={related.slug} className="p-5">
                <p className="text-xs font-medium uppercase text-primary">{related.category}</p>
                <h3 className="mt-2 font-semibold leading-6">
                  <Link href={`/blog/${related.slug}`} className="hover:text-primary">
                    {related.title}
                  </Link>
                </h3>
                <p className="mt-3 text-xs text-muted-foreground">
                  {getRichArticleReadTime(related.slug, related.readTime)}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-lg border bg-card p-6 text-center">
          <h2 className="text-2xl font-semibold">Get weekly visa intelligence</h2>
          <p className="mt-2 text-muted-foreground">
            Daily official-source monitoring with material changes verified before guidance is rewritten.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
            ],
          }),
        }}
      />
    </article>
  );
}
