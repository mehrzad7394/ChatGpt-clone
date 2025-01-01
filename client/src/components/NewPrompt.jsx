import { useRef } from "react";
import Upload from "./upload/Upload";

const NewPrompt = ({ image, setImage, add }) => {
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text, false);
    formRef.current.reset();
  };

  return (
    <>
      {image.isLoading && <div>Loading...</div>}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="w-full  sticky bottom-2  bg-[#2c2937] rounded-3xl flex items-center gap-5 px-5 h-16"
      >
        <Upload setImg={setImage} />

        <input type="file" multiple={false} hidden id="file" />
        <input
          name="text"
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
