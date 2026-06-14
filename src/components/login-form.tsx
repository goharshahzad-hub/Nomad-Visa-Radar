import { Chrome, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { safeNextPath } from "@/lib/routes";

export function LoginForm({
  nextPath = "/dashboard",
  error,
}: {
  nextPath?: string;
  error?: string;
}) {
  const safeNext = safeNextPath(nextPath);

  return (
    <Card className="mx-auto max-w-md p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
        <ShieldCheck className="h-6 w-6" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">Login to Nomad Visa Radar</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Save favorite countries, receive alerts, manage newsletter settings, and keep your comparison history.
      </p>
      {error && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          Login could not be completed. Please check your Supabase and Google OAuth settings.
        </div>
      )}
      <a
        className={buttonVariants({ className: "mt-6 w-full", size: "lg" })}
        href={`/auth/google?next=${encodeURIComponent(safeNext)}`}
      >
        <Chrome className="h-4 w-4" />
        Continue with Google
      </a>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Supabase Auth must have Google enabled in the Supabase dashboard with this app URL added as an OAuth redirect.
      </p>
    </Card>
  );
}
