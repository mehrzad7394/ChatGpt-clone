import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ChatList = () => {
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    },
  });

  return (
    <div className="w-72 sticky top-16 hidden md:flex flex-col gap-2 h-[calc(100vh-64px)] py-1 overflow-auto pe-2">
      <span className="font-semibold text-[9px]">DASHNOARD</span>
      <Link to={"/dashboard"}>Create a new Chat</Link>
      <Link to={"/"}>Explore</Link>
      <Link to={"/"}>Contact</Link>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-5 my-2 rounded-sm " />
      <span className="font-semibold text-[9px]">Recent Chats</span>
      <div className="flex flex-col gap-2">
        {isPending
          ? "Loading..."
          : error
          ? "Something Went Wrong"
          : data?.map((chat) => (
              <Link
                to={`/dashboard/chats/${chat?._id}`}
                key={chat?._id}
                className="p-2 text-sm rounded-xl hover:bg-[#2c2937]"
              >
                {chat?.title}
              </Link>
            ))}
      </div>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-5 my-2 rounded-sm " />
      <div className="text-xs  gap-2  flex  mt-auto">
        <img src="/logo.png" alt="" className="w-5 h-5" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Upgrade to premium</span>
          <span className="text-xs font-semibold text-[#888]">
            Get Unlimited Access to all feautures
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
