import Link from "next/link";
import { Globe2 } from "lucide-react";

const footerGroups = [
  {
    title: "Explore Visas",
    links: [
      ["Countries", "/countries"],
      ["Compare", "/compare"],
      ["Latest Updates", "/latest-updates"],
      ["Dashboard", "/dashboard"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Blog", "/blog"],
      ["Editorial Policy", "/editorial-policy"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy-policy"],
      ["Terms", "/terms"],
      ["Cookies", "/cookie-policy"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
              <Globe2 className="h-5 w-5" />
            </span>
            <span className="font-semibold">Nomad Visa Radar</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Visa intelligence for remote workers, relocation teams, and publishers who need official-source review before guidance goes live.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold">{group.title}</p>
              <div className="mt-3 space-y-2">
                {group.links.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
        (c) 2026 Nomad Visa Radar. Information is editorial and not legal or tax advice.
      </div>
    </footer>
  );
}
