import { useEffect, useRef, useState } from "react";
import Upload from "./upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const endRef = useRef(null);
  const formRef = useRef(null);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const chat = model.startChat({
    history: data?.history.map((his) => ({
      parts: [{ text: his.parts[0]?.text }],
      role: his.role,
    })),
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data, question, answer, image.dbData, image.aiData]);

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: image.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data?._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImage({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);
    try {
      const result = await chat.sendMessageStream(
        Object.entries(image.aiData).length ? [image.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data?.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
