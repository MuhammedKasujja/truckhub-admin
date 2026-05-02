import { getTonnages } from "@/features/settings/tonnage/service";
import { TonnageTable } from "@/features/settings/tonnage/components/tonnage-table";

export default function Page() {
  const promises = getTonnages();
  return <TonnageTable tonnageListPromise={promises} />;
}
