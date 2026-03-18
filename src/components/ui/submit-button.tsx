import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";

export function SubmitButton({
  isSubmitting = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isSubmitting: boolean;
  }) {
  return (
    <Button {...props} disabled={isSubmitting}>
      {isSubmitting && <Loader2 className="size-4 animate-spin" />}
      {isSubmitting ? "Submitting..." : `Sumit`}
    </Button>
  );
}
