"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type State = "idle" | "submitting";
type Notice = {
  tone: "success" | "error";
  message: string;
  contactEmail?: string;
};

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [notice, setNotice] = useState<Notice | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setNotice(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const result = (await response.json()) as { error?: string; mode?: string };
      const contactEmail =
        typeof (result as { contactEmail?: unknown }).contactEmail === "string"
          ? (result as { contactEmail: string }).contactEmail
          : undefined;

      if (!response.ok) {
        const error = new Error(result.error ?? "Could not send message") as Error & {
          contactEmail?: string;
        };
        error.contactEmail = contactEmail;
        throw error;
      }

      form.reset();
      const savedOnly = result.mode === "stored";
      const successMessage = savedOnly
        ? "Message saved for the editorial team."
        : "Message delivered to the editorial inbox.";

      setNotice({
        tone: "success",
        message: successMessage,
      });
      toast.success(savedOnly ? "Message saved." : "Message sent to the editorial team.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send message";
      const contactEmail =
        error instanceof Error && "contactEmail" in error && typeof error.contactEmail === "string"
          ? error.contactEmail
          : undefined;

      setNotice({
        tone: "error",
        message,
        contactEmail,
      });
      toast.error(message);
    } finally {
      setState("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-lg border bg-card p-5">
      {notice && (
        <div
          className={
            notice.tone === "success"
              ? "rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300"
              : "rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          }
        >
          <p>{notice.message}</p>
          {notice.contactEmail && (
            <a href={`mailto:${notice.contactEmail}`} className="mt-2 inline-flex font-medium underline underline-offset-4">
              Email {notice.contactEmail} directly
            </a>
          )}
        </div>
      )}
      <Input name="name" placeholder="Name" autoComplete="name" required />
      <Input name="email" type="email" placeholder="Email" autoComplete="email" required />
      <Textarea name="message" placeholder="Message" required />
      <Button type="submit" disabled={state === "submitting"}>
        <Send className="h-4 w-4" />
        {state === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
