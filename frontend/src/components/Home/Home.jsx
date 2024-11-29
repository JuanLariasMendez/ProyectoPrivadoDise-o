import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../AppSidebar/AppSidebar";

const Home = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex items-center p-4">
            <SidebarTrigger />
            <div className="ml-4">You are logged</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;
