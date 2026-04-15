import { getServices } from "@/features/services/service";
import { ServiceTable } from "@/features/services/components/service-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { ServiceSearchParamsCache } from "@/features/services/schemas";
import { requirePermission } from "@/lib/auth";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ServicesPage(props: PageProps<"/services">) {
  await requirePermission("services:view");

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    ServiceSearchParamsCache,
  );

  const { data } = await getServices(searchParams);
  return (
    <div className="space-y-4">
      <Card className="py-2">
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardAction>
            <Button type="button" size={"icon"}>
              <ListIcon />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <ServiceTable services={data} />
    </div>
  );
}
