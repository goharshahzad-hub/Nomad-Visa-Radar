import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/visa-data";
import { slugify } from "@/lib/utils";

export function generateStaticParams() {
  return Array.from(new Set(blogPosts.map((post) => slugify(post.category)))).map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const posts = blogPosts.filter((post) => slugify(post.category) === category);
  const title = posts[0]?.category ?? category;

  return {
    title: `${title} Digital Nomad Visa Articles`,
    description: `Read practical ${title} digital nomad visa guides with requirements, costs, tax notes, and official-source review context.`,
    alternates: {
      canonical: `/blog/category/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = blogPosts.filter((post) => slugify(post.category) === category);

  if (!posts.length) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Badge variant="outline">Category</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
        {posts[0].category} articles
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Focused guides for this topic, built from the same official-source review model as the country pages.
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
