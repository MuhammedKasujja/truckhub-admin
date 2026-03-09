import { getCarModels } from "@/features/setiings/car-model/service";
import { CarModelTable } from "./_components/car-model-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { CarModelSearchParamsCache } from "@/features/setiings/car-model/schemas";
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
