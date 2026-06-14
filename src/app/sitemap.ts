import type { MetadataRoute } from "next";
import { blogPosts, countries } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/countries",
    "/compare",
    "/latest-updates",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
    "/editorial-policy",
    "/disclaimer",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...["portugal-vs-spain", "portugal-vs-spain-vs-croatia"].map((slug) => ({
      url: `${siteConfig.url}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...countries.map((country) => ({
      url: `${siteConfig.url}/digital-nomad-visa/${country.slug}`,
      lastModified: new Date(country.lastVerified),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...Array.from(new Set(blogPosts.map((post) => slugify(post.category)))).map((category) => ({
      url: `${siteConfig.url}/blog/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...Array.from(new Set(blogPosts.map((post) => slugify(post.author)))).map((author) => ({
      url: `${siteConfig.url}/author/${author}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
