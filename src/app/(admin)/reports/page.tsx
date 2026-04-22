import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Cloud } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <Empty className="border border-dashed min-h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle className="text-3xl">Reports</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription className="flex flex-col gap-4 justify-center items-center">
          Comming soon.......
          <Button type="button" variant={"link"} asChild>
            <Link href={"/reports/audits"}>
              View Logs
            </Link>
          </Button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
