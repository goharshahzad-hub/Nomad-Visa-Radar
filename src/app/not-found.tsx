import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Compass className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-normal">Page not found</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          This visa page, article, or comparison is not available yet.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/countries" className={cn(buttonVariants({ variant: "premium" }))}>
            Browse countries
          </Link>
          <Link href="/compare" className={cn(buttonVariants({ variant: "outline" }))}>
            Compare visas
          </Link>
        </div>
      </Card>
    </div>
  );
}
