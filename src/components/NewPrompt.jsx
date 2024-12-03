import { useEffect, useRef } from "react";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, []);
  return (
    <>
      <div className="pb-3" ref={endRef}></div>
      <form className="w-full md:w-[50%] absolute bottom-2  bg-[#2c2937] rounded-3xl flex items-center gap-5 px-5 h-16">
        <label
          htmlFor="file"
          className="rounded-full bg-[#605e68] border-none p-3 flex items-center justify-center cursor-pointer"
        >
          <img src="/attachment.png" alt="" className="w-5 h-5 " />
        </label>
        <input type="file" multiple={false} hidden id="file" />
        <input
          type="text"
          placeholder="Ask anything ..."
          className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"
        />
        <button className="rounded-full bg-[#605e68] border-none p-3 flex items-center justify-center cursor-pointer">
          <img src="/arrow.png" alt="" className="w-5 h-5 " />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
