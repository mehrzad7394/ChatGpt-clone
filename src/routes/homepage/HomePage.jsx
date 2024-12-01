import { useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("Human1");
  return (
    <div className="flex flex-col md:flex-row items-center gap-24 h-full relative overflow-hidden">
      <img
        src="/orbital.png"
        alt=""
        className="absolute bottom-0 left-0 opacity-5 animate-rotateOrbital"
      />
      <div className="flex-1 flex flex-col justify-center items-center gap-4 z-10">
        <h1 className="text-3xl bg-gradient-to-r from-blue-500 to-green-100 bg-clip-text text-transparent uppercase">
          ChatGpt Clone
        </h1>
        <h2 className="text-lg font-bold">
          SuperCharge Your Creativity and Productivity
        </h2>
        <h3 className="text-sm text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
          blanditiis maxime necessitatibus ipsum harum quidem eum
        </h3>
        <Link
          to={"/dashboard"}
          className="p-3 bg-blue-500 cursor-pointer text-white rounded-3xl text-sm hover:bg-white hover:text-blue-500"
        >
          Get Started
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex  items-center bg-[#130e2d] rounded-[50px] h-full md:h-[70%] relative">
          <div className="size-full overflow-hidden absolute top-0 left-0 rounded-[50px]">
            <div className="bg-bgbot opacity-5 size-full bg-auto animate-bgAnimation"></div>
          </div>
          <img
            src="./bot.png"
            alt=""
            className="w-[90%] h-[90%] object-contain animate-botAnimation"
          />
          <div className="absolute bottom-0 md:bottom-[-30px] p-2 gap-2 bg-[#2c2937] rounded-xl right-[-50px] flex items-center">
            <img
              src={`${
                typingStatus === "Human1"
                  ? "/human1.jpeg"
                  : typingStatus === "Human2"
                  ? "/human2.jpeg"
                  : "/bot.png"
              }`}
              alt=""
              className="rounded-full h-8 w-8 object-contain"
            />
            <TypeAnimation
              sequence={[
                "Human:We produce food for Mice",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot:We produce food for Hamsters",
                1000,
                () => {
                  setTypingStatus("Human2");
                },
                "Human2:We produce food for Guinea Pigs",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot:We produce food for Chinchillas",
                1000,
                () => {
                  setTypingStatus("Human1");
                },
              ]}
              wrapper="span"
              speed={50}
              cursor={true}
              omitDeletionAnimation
              style={{ fontSize: "15px", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>
      <div className="md:absolute md:bottom-7 md:left-[50%] md:translate-x-[-50%] flex items-center gap-5">
        <img src="/logo.png" alt="" className="w-4 h-4" />
        <Link to={"/"} className="flex gap-2 text-xs">Terms of Service</Link>|
        <Link to={"/"} className="flex gap-2 text-xs">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default HomePage;
