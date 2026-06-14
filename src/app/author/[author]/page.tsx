import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/visa-data";
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="outline">Author</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
        {posts[0].author}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Editorial reviews focused on official sources, conservative visa interpretation, and practical remote-work relocation planning.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="overflow-hidden hover:bg-muted/40">
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
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
