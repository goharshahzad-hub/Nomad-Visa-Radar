"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-destructive text-destructive-foreground">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-normal">Something went wrong</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          The page could not load correctly. Try again, or use the navigation to continue browsing.
        </p>
        <Button onClick={reset} variant="premium" className="mt-6">
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
      </Card>
    </div>
  );
}
