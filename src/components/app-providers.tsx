import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({
  locale,
  children,
}: Readonly<{
  locale: string;
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextIntlClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}
