import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, FilePenLine, Newspaper, ShieldCheck } from "lucide-react";
import { SystemNotice } from "@/components/system-notice";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { canAccessAdmin, getAuthContext } from "@/lib/auth";
import { latestUpdates } from "@/lib/visa-data";

export const metadata: Metadata = {
  title: "Admin Review",
  description: "Role-based admin area for country data, updates, blog posts, and alerts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const auth = await getAuthContext();

  if (auth.configured && !auth.user) {
    redirect("/login?next=%2Fadmin");
  }

  const allowed = !auth.configured || canAccessAdmin(auth.profile);

  const stats: { label: string; value: number; icon: LucideIcon }[] = [
    { label: "Country edits", value: 18, icon: FilePenLine },
    { label: "Pending updates", value: 7, icon: AlertTriangle },
    { label: "Blog drafts", value: 4, icon: Newspaper },
    { label: "Reviewed alerts", value: 29, icon: ShieldCheck },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge variant="gold">Role-based access</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
          Admin review console
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Changes from daily source monitoring create review tasks here. Nothing auto-publishes; admins approve, reject, or request editorial review.
        </p>
      </div>

      {!auth.configured && (
        <div className="mt-6">
          <SystemNotice
            title="Admin preview mode"
            message="Supabase is not configured locally, so this page shows sample review data. In production, only editor and admin roles can access this console."
          />
        </div>
      )}

      {!allowed && (
        <div className="mt-8">
          <Card className="p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Admin access required</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your account is signed in, but it does not have editor or admin permissions.
            </p>
          </Card>
        </div>
      )}

      {allowed && (
        <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-4 font-mono text-3xl font-semibold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Detected change</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestUpdates.map((update) => (
              <TableRow key={update.title}>
                <TableCell className="font-medium">{update.title}</TableCell>
                <TableCell>{update.source}</TableCell>
                <TableCell>{update.confidence}%</TableCell>
                <TableCell>
                  <Badge variant="gold">Needs review</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
        </>
      )}
    </div>
  );
}
