import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NewsletterForm } from "@/components/newsletter-form";
import { blogPosts } from "@/lib/visa-data";
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
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return {};

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
      modifiedTime: post.updated,
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
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated,
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
    citation: post.sources?.map((source) => source.url),
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
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
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span key={keyword} className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                  {keyword}
                </span>
              ))}
            </div>
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
          {post.sections.map((section) => (
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
          ))}
        </div>

        {post.sources && post.sources.length > 0 && (
          <Card className="mt-10 p-6">
            <h2 className="text-2xl font-semibold">Official sources checked</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Visa rules can change by consulate, nationality, and filing date. Use these official pages before making an application decision.
            </p>
            <ul className="mt-5 space-y-3">
              {post.sources.map((source) => (
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
            {post.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-medium">{item.question}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-10 rounded-lg border bg-card p-6 text-center">
          <h2 className="text-2xl font-semibold">Get weekly visa intelligence</h2>
          <p className="mt-2 text-muted-foreground">
            Official-source updates, reviewed by humans before publication.
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
