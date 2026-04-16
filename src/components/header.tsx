import { cn } from "@/lib/utils"; // adjust path as needed

function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        // Base layout
        "group/page-header @container/page-header",
        "grid auto-rows-min items-start gap-1 rounded-t-xl px-4 py-2",

        // Small card variant support
        "group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:py-3",

        // Border bottom support
        "[.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",

        // Two-column layout when PageAction is present
        "has-data-[slot=page-action]:grid-cols-[1fr_auto]",

        // When both title + description exist
        "has-data-[slot=page-description]:grid-rows-[auto_auto]",

        className,
      )}
      {...props}
    />
  );
}

function PageTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-title"
      className={cn(
        "text-xl font-medium leading-snug",
        "group-data-[size=sm]/card:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function PageDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-description" // kept your original data-slot
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

function PageAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-action"
      className={cn(
        // Perfect alignment: top-right, spans both rows when description exists
        "col-start-2 row-span-2 row-start-1",
        "self-start justify-self-end",
        // Optional: add some spacing if needed
        "ml-4",
        className,
      )}
      {...props}
    />
  );
}

export { PageHeader, PageTitle, PageAction, PageDescription };
