import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShareActions } from "@/components/share-actions";
import { blogPosts } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Nomad Visa Blog",
  description:
    "Editorial guides about digital nomad visas, tax notes, family relocation, remote worker requirements, country comparisons, and visa costs.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Digital Nomad Visa Blog",
    description:
      "Editorial guides about digital nomad visas, tax notes, family relocation, remote worker requirements, country comparisons, and visa costs.",
    images: [siteConfig.socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Nomad Visa Blog",
    description:
      "Editorial guides about digital nomad visas, tax notes, family relocation, remote worker requirements, country comparisons, and visa costs.",
    images: [siteConfig.socialImage],
  },
};

export default function BlogPage() {
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Nomad Visa Blog",
    description: metadata.description,
    url: `${siteConfig.url}/blog`,
    hasPart: blogPosts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      image: post.image,
      dateModified: post.updated,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="outline">Visa guides</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
        Digital nomad visa articles
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        Practical guides for comparing visa requirements, tax notes, family planning, country costs, and remote-work relocation choices.
      </p>
      <ShareActions
        title="Digital nomad visa articles"
        text="Browse digital nomad visa guides on Nomad Visa Radar."
        url={`${siteConfig.url}/blog`}
        className="mt-5"
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${slugify(category)}`}
            className="rounded-md border px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            {category}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/blog/${post.slug}`} className="block flex-1">
              <div className="relative h-44">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <Badge variant="status" className="absolute left-4 top-4">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-6 pb-3">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 2).map((keyword) => (
                      <span key={keyword} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    {post.readTime} - {post.date}
                  </div>
                </div>
              </Link>
              <div className="border-t px-6 py-3">
                <ShareActions
                  title={post.title}
                  text={post.excerpt}
                  url={`${siteConfig.url}/blog/${post.slug}`}
                  compact
                />
              </div>
            </Card>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
