import { EditSettingsForm } from "@/features/setiings";
import { getSettings } from "@/features/setiings/service";

export default async function AdvancedSettingsPage() {
  const { data: settings } = await getSettings();

  return (
    <div className="flex h-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Advanced Settings</h1>
      <EditSettingsForm settings={settings} />
    </div>
  );
}
