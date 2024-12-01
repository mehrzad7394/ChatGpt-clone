import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center gap-24 h-full relative">
      <img
        src="/orbital.png"
        alt=""
        className="absolute bottom-0 left-0 opacity-5 animate-rotateOrbital"
      />
      <div className="flex-1 flex flex-col justify-center items-center gap-4">
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
          className="p-3 bg-blue-500 text-white rounded-3xl text-sm hover:bg-white hover:text-blue-500"
        >
          Get Started
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex  items-center bg-[#130e2d] rounded-[50px] h-[50%] relative">
          <div className="size-full overflow-hidden absolute top-0 left-0 rounded-[50px]">
            <div className="bg-bgbot opacity-5 size-full bg-auto animate-bgAnimation"></div>
          </div>
          <img src="./bot.png" alt="" className="w-full h-full object-contain animate-botAnimation"/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
