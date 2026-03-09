import { getTonnages } from "@/features/setiings/tonnage/service";
import { TonnageTable } from "@/features/setiings/tonnage/components/tonnage-table";

export default function Page() {
  const promises = getTonnages();
  return <TonnageTable tonnageListPromise={promises} />;
}
