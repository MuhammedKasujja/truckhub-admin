import { EditSettingsForm } from "@/features/setiings";

export default function AdvancedSettingsPage() {
  return (
    <div className="flex h-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Advanced Settings</h1>
      <EditSettingsForm />
    </div>
  );
}
