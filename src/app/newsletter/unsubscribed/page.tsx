import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, CircleX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Newsletter preferences",
  robots: { index: false, follow: false },
};

export default async function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const successful = status === "done";

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <Card className="p-8 text-center">
        {successful ? (
          <CircleCheck className="mx-auto h-10 w-10 text-primary" />
        ) : (
          <CircleX className="mx-auto h-10 w-10 text-destructive" />
        )}
        <h1 className="mt-5 text-3xl font-semibold">
          {successful ? "You have been unsubscribed" : "We could not update that subscription"}
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          {successful
            ? "Weekly visa briefings will no longer be sent to this address. You can subscribe again at any time."
            : "The link may be incomplete or expired. Please use the contact page and we will help remove the address."}
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/" className={cn(buttonVariants())}>Return home</Link>
          {!successful && (
            <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>Contact us</Link>
          )}
        </div>
      </Card>
    </div>
  );
}
