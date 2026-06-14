import Link from "next/link";
import { BarChart3, Bell, ChevronDown, Globe2, LayoutDashboard, Search } from "lucide-react";
import { countries, latestUpdates } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { CountryFlag } from "@/components/country-flag";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const menuColumns = [
  {
    title: "Explore",
    links: [
      { href: "/countries", label: "All countries", icon: Globe2 },
      { href: "/compare", label: "Visa comparison", icon: BarChart3 },
      { href: "/latest-updates", label: "Latest updates", icon: Bell },
      { href: "/digital-nomad-visa/portugal", label: "Portugal D8", icon: Search },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { href: "/dashboard", label: "User dashboard", icon: LayoutDashboard },
      { href: "/blog", label: "Visa guides", icon: Search },
    ],
  },
];

export function SiteHeader() {
  const topCountries = countries.slice(0, 8);
  const tickerUpdates = latestUpdates.slice(0, 8);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/78 backdrop-blur-xl">
      <div className="border-b border-white/10 bg-zinc-950 text-white">
        <div className="relative mx-auto flex h-9 max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="update-marquee flex min-w-full shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-xs font-medium">
            {tickerUpdates.map((update) => (
              <Link
                key={update.slug}
                href={`/latest-updates#${update.slug}`}
                className="text-white/90 transition hover:text-white"
              >
                {update.title}
              </Link>
            ))}
          </div>
          <div
            className="update-marquee flex min-w-full shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-xs font-medium"
            aria-hidden="true"
          >
            {tickerUpdates.map((update) => (
              <Link
                key={`${update.slug}-repeat`}
                href={`/latest-updates#${update.slug}`}
                className="text-white/90 transition hover:text-white"
                tabIndex={-1}
              >
                {update.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
            <Globe2 className="h-5 w-5" />
          </span>
          <span className="truncate text-sm font-semibold tracking-normal sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div className="group relative">
            <button className="inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
              Explore Visas
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-1/2 top-12 w-[720px] -translate-x-1/2 rounded-lg border bg-popover p-4 opacity-0 shadow-2xl shadow-black/10 transition group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4">
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm font-semibold">Visa radar</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Search requirements, compare living conditions, and route every official-source change into human review.
                  </p>
                </div>
                {menuColumns.map((column) => (
                  <div key={column.title}>
                    <p className="px-2 text-xs font-medium uppercase text-muted-foreground">
                      {column.title}
                    </p>
                    <div className="mt-2 space-y-1">
                      {column.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                        >
                          <item.icon className="h-4 w-4 text-primary" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                {topCountries.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/digital-nomad-visa/${country.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    <CountryFlag country={country} className="h-3.5 w-5" />
                    {country.countryName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {siteConfig.nav.slice(1, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}
          >
            Login
          </Link>
          <Link
            href="/compare"
            className={cn(buttonVariants({ variant: "premium", size: "sm" }), "hidden min-[420px]:inline-flex")}
          >
            Compare
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
