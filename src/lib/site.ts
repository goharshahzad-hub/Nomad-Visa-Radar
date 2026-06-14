export const siteConfig = {
  name: "Nomad Visa Radar",
  description:
    "Search, compare, and monitor digital nomad visa requirements worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nomadvisaradar.com",
  nav: [
    { href: "/", label: "Home" },
    { href: "/countries", label: "Countries" },
    { href: "/compare", label: "Compare" },
    { href: "/latest-updates", label: "Latest Updates" },
    { href: "/blog", label: "Blog" },
    { href: "/dashboard", label: "Dashboard" },
  ],
};
