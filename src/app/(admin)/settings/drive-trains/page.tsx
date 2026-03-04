import { getDriveTrains } from "@/server/drive-trains";
import { DriveTrainTable } from "./_components/drive-train-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { DriveTrainSearchParamsCache } from "@/schemas/drive-train";

export default async function Page(props: PageProps<"/settings/drive-trains">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    DriveTrainSearchParamsCache,
  );
  const promise = getDriveTrains(searchParams);

  return <DriveTrainTable promise={promise} />;
}
