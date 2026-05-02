import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { SettingsNavBar } from "./_components/settings-navbar";
import {
  PageDescription,
  PageHeader,
  PageTitle,
  PageTitleIcon,
} from "@/components/page-header";
import { SettingsIcon } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader>
        <PageTitle>
          <PageTitleIcon>
            <SettingsIcon className="h-5 w-5" />
          </PageTitleIcon>
          Settings
        </PageTitle>
        <PageDescription>
          Manage system settings and preferences
        </PageDescription>
      </PageHeader>
      <SidebarProvider className="items-start">
        <SettingsSidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* <SettingsNavBar /> */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
