import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Cloud } from "lucide-react";

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
        <EmptyDescription>Comming soon.......</EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
