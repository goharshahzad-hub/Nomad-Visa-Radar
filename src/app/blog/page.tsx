import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShareActions } from "@/components/share-actions";
import { getRichArticleReadTime, getRichBlogArticle } from "@/lib/blog-articles";
import { getPublicBlogPosts } from "@/lib/managed-content";
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

export default async function BlogPage() {
  const posts = await getPublicBlogPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const [featuredPost, ...remainingPosts] = posts;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Nomad Visa Blog",
    description: metadata.description,
    url: `${siteConfig.url}/blog`,
    hasPart: posts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      image: post.image,
      dateModified: post.managed ? post.updated : getRichBlogArticle(post.slug)?.reviewedDate ?? post.updated,
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

      {featuredPost && (
        <section className="mt-10 grid overflow-hidden border-y py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="relative min-h-72 overflow-hidden rounded-lg">
            <Image
              src={featuredPost.image}
              alt={featuredPost.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-7 lg:py-4">
            <p className="text-sm font-semibold text-primary">Featured guide</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary">
                {featuredPost.title}
              </Link>
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">{featuredPost.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{featuredPost.author}</span>
              <span>Updated {featuredPost.managed ? featuredPost.updated : getRichBlogArticle(featuredPost.slug)?.reviewedDate ?? featuredPost.updated}</span>
              <span>{getRichArticleReadTime(featuredPost.slug, featuredPost.readTime)}</span>
            </div>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
            >
              Read the complete guide <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {remainingPosts.map((post) => (
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
                    {post.managed ? post.readTime : getRichArticleReadTime(post.slug, post.readTime)} - Updated {post.managed ? post.updated : getRichBlogArticle(post.slug)?.reviewedDate ?? post.updated}
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
