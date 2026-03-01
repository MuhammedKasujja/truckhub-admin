"use client";
import { Card, CardContent } from "./ui/card";
import { Field, FieldGroup } from "./ui/field";
import { Button } from "./ui/button";
import { useTranslation } from "@/i18n";
import { useRouter } from "next/navigation";
import z from "zod";
import { toast } from "sonner";
import { login } from "@/server/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField, PasswordField } from "@/components/ui/form-fields";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export function LoginForm() {
  const router = useRouter();

  const tr = useTranslation("common");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { success, message } = await login(values);
    if (success) {
      toast.success("Login successfully");
      router.replace("/admin/dashboard");
    } else {
      toast.error(message);
    }
  }

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login into Truckhub
              </p>
            </div>
            <EmailField
              label="Email"
              name={'email'}
              control={form.control}
              placeholder="user@mail.com"
            />
            <PasswordField
              label="Password"
              name={'password'}
              control={form.control}
              placeholder="********"
            />
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
