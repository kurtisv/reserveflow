import { redirect } from "next/navigation";

import { signInWithCredentials, signInWithGitHub } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "Connexion",
    description: "Acces administrateur pour le boilerplate.",
    invalid: "Identifiants invalides.",
    github: "Se connecter avec GitHub",
    password: "Mot de passe",
    submit: "Se connecter",
  },
  en: {
    title: "Sign in",
    description: "Administrator access for the boilerplate.",
    invalid: "Invalid credentials.",
    github: "Sign in with GitHub",
    password: "Password",
    submit: "Sign in",
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const locale = await getCurrentLocale();
  const t = copy[locale];
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {params.error ? (
            <p className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {t.invalid}
            </p>
          ) : null}
          <div className="grid gap-4">
            {env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET ? (
              <form action={signInWithGitHub}>
                <Button className="w-full" type="submit">
                  {t.github}
                </Button>
              </form>
            ) : null}

            {env.AUTH_ENABLE_DEMO_LOGIN ? (
              <form action={signInWithCredentials} className="grid gap-4">
                <Input
                  autoComplete="email"
                  defaultValue={env.AUTH_DEMO_EMAIL}
                  name="email"
                  placeholder="admin@example.com"
                  type="email"
                />
                <Input
                  autoComplete="current-password"
                  defaultValue={env.AUTH_DEMO_PASSWORD}
                  name="password"
                  placeholder={t.password}
                  type="password"
                />
                <Button type="submit">{t.submit}</Button>
              </form>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
