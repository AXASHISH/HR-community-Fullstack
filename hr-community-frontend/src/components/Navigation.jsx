import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // null = unknown, {} = not logged in

  // Load user from localStorage
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (token && userInfo) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({
        name: userInfo.name || "User",
        isLoggedIn: true,
      });
    } else {
      setUser({ isLoggedIn: false });
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("savedEmail");
    delete axios.defaults.headers.common["Authorization"];
    setUser({ isLoggedIn: false });
    navigate("/login");
  };

  // Still loading user info?
  if (user === null) return null;

  return (
    <header className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* <SidebarTrigger /> */}
            <span className="text-xl font-bold text-foreground">
              HR Excellence Awards
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Welcome,</span>
                <span className="font-medium text-foreground">{user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/signup">
                  <Button variant="outline" size="sm">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="default" size="sm">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
