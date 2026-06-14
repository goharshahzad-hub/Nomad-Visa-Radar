const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nomadvisaradar.com")
  .trim()
  .replace(/\/+$/, "");

export const siteConfig = {
  name: "Nomad Visa Radar",
  description:
    "Search, compare, and monitor digital nomad visa requirements worldwide.",
  url: siteUrl,
  socialImage:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&h=630&q=80",
  nav: [
    { href: "/", label: "Home" },
    { href: "/countries", label: "Countries" },
    { href: "/compare", label: "Compare" },
    { href: "/latest-updates", label: "Latest Updates" },
    { href: "/blog", label: "Blog" },
    { href: "/dashboard", label: "Dashboard" },
  ],
};
