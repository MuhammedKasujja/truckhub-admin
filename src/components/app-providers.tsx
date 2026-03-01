import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
      <NuqsAdapter>
        <NextIntlClientProvider locale={locale}>
          <TooltipProvider>{children}</TooltipProvider>
        </NextIntlClientProvider>
        <Toaster />
      </NuqsAdapter>
    </ThemeProvider>
  );
}
