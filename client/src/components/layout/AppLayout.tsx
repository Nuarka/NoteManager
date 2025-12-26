import { Navbar } from "./Navbar";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-[1920px] mx-auto w-full overflow-hidden">
        <SidebarLeft />
        <main className="flex-1 min-w-0 h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 overflow-y-auto relative pt-[0px] pb-[0px]">
          {children}
        </main>
        <SidebarRight />
      </div>
    </div>
  );
}
