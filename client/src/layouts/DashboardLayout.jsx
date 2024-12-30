import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);
  if (!isLoaded) return "Loading...";
  return (
    <div className="flex flex-1 md:ps-2 md:gap-2">
      <ChatList />
      <div className="w-full bg-[#12101d] h-full flex flex-col ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
