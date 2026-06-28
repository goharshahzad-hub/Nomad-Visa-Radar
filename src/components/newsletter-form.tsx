"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json().catch(() => null)) as
        | { alreadySubscribed?: boolean; confirmationSent?: boolean }
        | null;

      if (response.ok) {
        setEmail("");
        toast.success(
          result?.alreadySubscribed
            ? "You are already subscribed."
            : result?.confirmationSent
              ? "Subscribed. Check your inbox for confirmation."
              : "Subscribed. Your first weekly update will arrive by email.",
        );
        return;
      }

      toast.error("Could not subscribe right now. Please try again.");
    } catch {
      toast.error("Could not reach the subscription service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={subscribe}
      className={compact ? "flex gap-2" : "mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"}
    >
      <label className="sr-only" htmlFor={compact ? "newsletter-compact" : "newsletter"}>
        Email address
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={compact ? "newsletter-compact" : "newsletter"}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
          className="pl-9"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving" : "Get updates"}
      </Button>
    </form>
  );
}
