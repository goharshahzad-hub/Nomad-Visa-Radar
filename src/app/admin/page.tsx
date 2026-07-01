import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { ContentStudio } from "@/components/admin/content-studio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAuthContext } from "@/lib/auth";
import { adminEmail } from "@/lib/email";

export const metadata: Metadata = {
  title: "Content Studio",
  description: "Private publishing studio for Nomad Visa Radar.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const auth = await getAuthContext();

  if (!auth.user) {
    redirect("/login?next=%2Fadmin");
  }

  const allowed = auth.user.email?.trim().toLowerCase() === adminEmail.trim().toLowerCase();

  if (!allowed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
        <Card className="p-8 text-center">
          <ShieldCheck className="mx-auto h-9 w-9 text-primary" />
          <h1 className="mt-5 text-2xl font-semibold">Administrator access required</h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            This publishing studio is restricted to the Nomad Visa Radar owner account.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge variant="success">Owner access</Badge>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Content studio</h1>
        <p className="mt-3 text-lg leading-8 text-muted-foreground">
          Create and publish articles, update key site sections, replace imagery, manage official sources, and remove outdated content. Published changes appear on the public website immediately.
        </p>
      </div>
      <ContentStudio />
    </div>
  );
}
