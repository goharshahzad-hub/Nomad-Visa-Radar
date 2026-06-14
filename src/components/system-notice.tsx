import { AlertTriangle, LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SystemNotice({
  title,
  message,
  tone = "warning",
}: {
  title: string;
  message: string;
  tone?: "warning" | "locked";
}) {
  const Icon = tone === "locked" ? LockKeyhole : AlertTriangle;

  return (
    <Card className="border-dashed p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{message}</p>
        </div>
      </div>
    </Card>
  );
}
