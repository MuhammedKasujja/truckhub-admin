import { getCarModels } from "@/server/car-models";
import { CarModelTable } from "./_components/car-model-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { CarModelSearchParamsCache } from "@/schemas/car-model";
import { getVehicleSettings } from "@/server/settings";

export default async function Page(props: PageProps<"/settings/car-models">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    CarModelSearchParamsCache,
  );
  const promises = Promise.all([
    getCarModels(searchParams),
    getVehicleSettings(),
  ]);

  return <CarModelTable promises={promises} />;
}
