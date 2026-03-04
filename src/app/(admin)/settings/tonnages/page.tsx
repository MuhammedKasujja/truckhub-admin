import { getTonnages } from "@/server/tonnages";
import { TonnageTable } from "./_components/tonnage-table";

export default function Page() {
  const promises = getTonnages();
  return <TonnageTable tonnageListPromise={promises} />;
}
