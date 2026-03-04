import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { SettingsNavBar } from "./_components/settings-navbar";

export default function SettingsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="items-start">
      <SettingsSidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <SettingsNavBar/>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
