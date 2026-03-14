import { getDriveTrains } from "@/features/setiings/drive-trains/service";
import { DriveTrainTable } from "@/features/setiings/drive-trains/components/drive-train-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { DriveTrainSearchParamsCache } from "@/features/setiings/drive-trains/schemas";

export default async function Page(props: PageProps<"/settings/drive-trains">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    DriveTrainSearchParamsCache,
  );
  const promise = getDriveTrains(searchParams);

  return <DriveTrainTable promise={promise} />;
}
