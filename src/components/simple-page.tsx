import { Badge } from "@/components/ui/badge";
import { ShareActions } from "@/components/share-actions";

export function SimplePage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <Badge variant="outline">{eyebrow}</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
        {title}
      </h1>
      <ShareActions
        title={`${title} | Nomad Visa Radar`}
        text={`Read ${title} on Nomad Visa Radar.`}
        className="mt-5"
      />
      <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:mt-8">
        {children}
      </div>
    </div>
  );
}
