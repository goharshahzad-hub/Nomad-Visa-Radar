"use client";

import { useMemo } from "react";
import { Copy, Linkedin, Mail, MessageCircle, Send, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ShareActionsProps = {
  title: string;
  url?: string;
  text?: string;
  compact?: boolean;
  className?: string;
};

function absoluteShareUrl(url?: string) {
  if (url?.startsWith("http")) return url;
  return new URL(url || "/", siteConfig.url).toString();
}

export function ShareActions({
  title,
  url,
  text,
  compact = false,
  className,
}: ShareActionsProps) {
  const shareUrl = absoluteShareUrl(url);
  const shareText = text ?? title;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`);

  const links = useMemo(
    () => [
      {
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
        icon: Mail,
      },
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        icon: Linkedin,
      },
      {
        label: "X",
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodedUrl}`,
        icon: Send,
      },
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodedText}`,
        icon: MessageCircle,
      },
    ],
    [encodedText, encodedTitle, encodedUrl, shareText],
  );

  async function shareNative() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        return;
      }
    }

    await copyLink();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied.");
  }

  const buttonSize = compact ? "h-8 w-8" : "";
  const iconSize = compact ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      aria-label={`Share ${title}`}
    >
      {!compact && <span className="text-sm font-medium text-muted-foreground">Share</span>}
      <Button
        type="button"
        variant="outline"
        size={compact ? "icon" : "sm"}
        onClick={shareNative}
        aria-label={`Share ${title}`}
        title="Share"
        className={buttonSize}
      >
        <Share2 className={iconSize} />
        {!compact && "Share"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size={compact ? "icon" : "sm"}
        onClick={copyLink}
        aria-label={`Copy link to ${title}`}
        title="Copy link"
        className={buttonSize}
      >
        <Copy className={iconSize} />
        {!compact && "Copy"}
      </Button>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={label === "Email" ? undefined : "_blank"}
          rel={label === "Email" ? undefined : "noreferrer"}
          aria-label={`Share ${title} on ${label}`}
          title={label}
          className={cn(
            buttonVariants({ variant: "outline", size: compact ? "icon" : "sm" }),
            buttonSize,
          )}
        >
          <Icon className={iconSize} />
          {!compact && label}
        </a>
      ))}
    </div>
  );
}
