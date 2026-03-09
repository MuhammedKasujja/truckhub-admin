import { getTonnages } from "@/features/setiings/tonnage/service";
import { TonnageTable } from "./_components/tonnage-table";

export default function Page() {
  const promises = getTonnages();
  return <TonnageTable tonnageListPromise={promises} />;
}
