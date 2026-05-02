import { EditSettingsForm } from "@/features/settings";
import { getSettings } from "@/features/settings/service";

export default async function AdvancedSettingsPage() {
  const { data: settings } = await getSettings();

  return (
    <div className="flex h-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Advanced Settings</h1>
      <EditSettingsForm settings={settings} />
    </div>
  );
}
