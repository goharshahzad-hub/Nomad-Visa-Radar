import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { safeNextPath } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Nomad Visa Radar with Google and Supabase Auth.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm nextPath={nextPath} error={params.error} />
    </div>
  );
}
