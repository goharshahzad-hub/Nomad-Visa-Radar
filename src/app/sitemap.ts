import type { MetadataRoute } from "next";
import { getRichBlogArticle } from "@/lib/blog-articles";
import { getPublicBlogPosts, getPublicSiteSections } from "@/lib/managed-content";
import { countries } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, managedSections] = await Promise.all([
    getPublicBlogPosts(),
    getPublicSiteSections(),
  ]);
  const builtInSectionKeys = new Set(["home-hero", "about-intro", "footer-description"]);
  const siteLastModified = new Date("2026-06-28");
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
      lastModified: siteLastModified,
      changeFrequency: route === "/countries" || route === "/latest-updates" ? "daily" as const : "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...["portugal-vs-spain", "portugal-vs-spain-vs-croatia"].map((slug) => ({
      url: `${siteConfig.url}/compare/${slug}`,
      lastModified: siteLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...countries.map((country) => ({
      url: `${siteConfig.url}/digital-nomad-visa/${country.slug}`,
      lastModified: new Date(country.lastVerified),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.managed ? post.updated : getRichBlogArticle(post.slug)?.reviewedDate ?? post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...Array.from(new Set(blogPosts.map((post) => slugify(post.category)))).map((category) => ({
      url: `${siteConfig.url}/blog/category/${category}`,
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...Array.from(new Set(blogPosts.map((post) => slugify(post.author)))).map((author) => ({
      url: `${siteConfig.url}/author/${author}`,
      lastModified: siteLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...managedSections
      .filter((section) => !builtInSectionKeys.has(section.key))
      .map((section) => ({
        url: `${siteConfig.url}/sections/${section.key}`,
        lastModified: new Date(section.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.55,
      })),
  ];
}
