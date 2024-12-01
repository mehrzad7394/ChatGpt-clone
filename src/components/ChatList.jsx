import React from "react";
import { Link } from "react-router-dom";

const ChatList = () => {
  return (
    <div className="flex flex-col h-full gap-2 py-1">
      <span className="font-semibold text-xs">DASHNOARD</span>
      <Link to={"/dashboard"}> Dashboard</Link>
      <Link to={"/"}>Explore</Link>
      <Link to={"/"}>Contact</Link>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-5 my-2 rounded-sm " />
      <span className="font-semibold text-xs">Recent Chats</span>
      <div className="flex flex-col gap-2">
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
        <Link to={"/"} className="p-2 text-sm rounded-xl hover:bg-[#2c2937]">
          Contact
        </Link>
      </div>
      <hr className="border-none h-[2px] bg-[#ddd] opacity-5 my-2 rounded-sm " />
      <div className="text-xs  gap-2  flex  mt-auto">
        <img src="/logo.png" alt="" className="w-5 h-5" />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Upgrade to premium</span>
          <span className="text-xs font-semibold text-[#808080]">Get Unlimited Access to all feautures</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
