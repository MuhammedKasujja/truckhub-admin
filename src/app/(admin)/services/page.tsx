import { getServices } from "@/features/services/service";
import { generatePageSearchParams } from "@/lib/search-params";
import { ServiceSearchParamsCache } from "@/features/services/schemas";
import { requirePermission } from "@/lib/auth";
import { ServiceListWrapper } from "@/features/services/components/service-list-wrapper";

export default async function ServicesPage(props: PageProps<"/services">) {
  await requirePermission("services:view");

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    ServiceSearchParamsCache,
  );

  const { data } = await getServices(searchParams);
  return <ServiceListWrapper services={data} />;
}
