import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        // const savedToken = localStorage.getItem("authToken");
        const savedToken = sessionStorage.getItem("authToken");
        if (!savedToken) {
          navigate("/login");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching token:", error);
        navigate("/login");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchToken();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {/* <AppSidebar /> */}
        <div className="flex-1 flex flex-col">
          <Navigation />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PrivateLayout;
