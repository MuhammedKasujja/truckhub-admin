"use client";
import { Card, CardContent } from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslation } from "@/i18n";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const tr = useTranslation("common");

  function login(e: any) {
    e.preventDefault();
    router.replace("/admin/dashboard");
  }

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <form className="p-6 md:p-8" onSubmit={login}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login into Truckhub
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="email">{tr("form.email")}</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                required
                name="email"
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">
                  {tr("form.password")}
                </FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required name="password" />
            </Field>
            <Field>
              <Button type="submit">{tr("form.login")}</Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="bg-muted relative hidden md:block">
          <img
            src="/sacco_logo.png"
            alt="logo"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
