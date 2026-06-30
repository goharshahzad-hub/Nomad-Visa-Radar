import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShareActions } from "@/components/share-actions";
import { getRichArticleReadTime, getRichBlogArticle } from "@/lib/blog-articles";
import { blogPosts, getAuthorProfile } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { titleCaseFromSlug, slugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const { author } = await params;
  return {
    title: `${titleCaseFromSlug(author)} Author Page`,
    description:
      "Author profile for Nomad Visa Radar editorial reviews, visa explainers, and official-source country research.",
    alternates: {
      canonical: `/author/${author}`,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;
  const posts = blogPosts.filter((post) => slugify(post.author) === author);

  if (!posts.length) {
    notFound();
  }

  const profile = getAuthorProfile(posts[0].author);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="outline">Author</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-lg font-medium text-primary">{profile.role}</p>
      <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">{profile.bio}</p>
      <ShareActions
        title={`${profile.name} author profile`}
        text={profile.bio}
        url={`${siteConfig.url}/author/${author}`}
        className="mt-5"
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <Card className="p-5">
          <h2 className="font-semibold">Research focus</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            {profile.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Review standard</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {profile.reviewStandard}
          </p>
        </Card>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden hover:bg-muted/40">
            <Link href={`/blog/${post.slug}`} className="block flex-1">
              <div className="relative h-40">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Updated {getRichBlogArticle(post.slug)?.reviewedDate ?? post.updated} - {getRichArticleReadTime(post.slug, post.readTime)}
                </p>
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
    </div>
  );
}
