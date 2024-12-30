import { useEffect, useRef, useState } from "react";
import Upload from "./upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";
const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const endRef = useRef(null);
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [question, answer, image.dbData, image.aiData]);
  const add = async (text) => {
    setQuestion(text);

    const result = await chat.sendMessageStream(
      Object.entries(image.aiData).length ? [image.aiData, text] : [text]
    );
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }
    setImage({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    add(text);
  };
  return (
    <>
      {image.isLoading && <div>Loading...</div>}
      {image.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={image.dbData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}

      {question && (
        <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
          {question}
        </div>
      )}
      {answer && (
        <div className="">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="pb-3" ref={endRef}></div>

      <form
        onSubmit={handleSubmit}
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
