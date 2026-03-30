"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row gap-2 space-y-4">
      <Button variant="ghost" size={"icon"} onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>
      <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
    </div>
  );
}

export function PageTitle() {
  return <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>;
}

export function PageActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

export function PageBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <Button variant="ghost" size={"icon"} onClick={() => handleBack()}>
      <ChevronLeftIcon />
    </Button>
  );
}
