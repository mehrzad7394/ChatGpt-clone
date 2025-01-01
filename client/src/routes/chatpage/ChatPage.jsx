import { Fragment, useEffect, useRef, useState } from "react";
import NewPrompt from "../../components/NewPrompt";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import { Bounce, toast } from "react-toastify";

const ChatPage = () => {
  const endRef = useRef(null);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [height, setHeight] = useState(null);
  const [hasRun, setHasRun] = useState(false);
  const queryClient = useQueryClient();
  const [image, setImage] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const { getToken } = useAuth();
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    },
  });
  const chat = model.startChat({
    history: data?.history?.length
      ? data.history.map(({ role, parts }) => ({
          role, // Ensure this is "user" or "assistant"
          parts: [{ text: parts[0].text }],
        }))
      : [
          {
            role: "user",
            parts: [{ text: "Default user message" }], // Provide a fallback if the history is empty
          },
        ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });
  const mutation = useMutation({
    mutationFn: async ({ question: que, answer: answ }) => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: que,
          answer: answ,
          img: image.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data?._id] })
        .then(() => {
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
      mutation.mutate({
        question: isInitial ? undefined : text,
        answer: accumulatedText,
      });
    } catch (error) {
      toast.error("Connection Failed To AI", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(error);
    }
  };
  useEffect(() => {
    if (!hasRun) {
      if (data?.history?.length === 1) {
        add(data?.history[0].parts[0].text, true);
        setHasRun(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const isDVHSupported = () => {
    const testElement = document.createElement("div");
    testElement.style.height = "100dvh";
    document.body.appendChild(testElement);
    const isSupported = testElement.offsetHeight > 0;
    document.body.removeChild(testElement);
    return isSupported;
  };

  // Set the table height dynamically
  const setTableHeight = () => {
    const isSupported = isDVHSupported();

    const dynamicHeight = window.innerHeight - "4rem";

    if (!isSupported) {
      setHeight(`${dynamicHeight}px`);
    }
  };
  useEffect(() => {
    setTableHeight(); // Set initial height
    window.addEventListener("resize", setTableHeight); // Recalculate on resize
    return () => {
      window.removeEventListener("resize", setTableHeight); // Clean up on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data, question, answer, image.dbData, image.aiData]);
  return (
    <div
      className="flex flex-col relative  h-[calc(100dvh-4rem)] overflow-hidden px-2 md:px-0"
      style={{ height }}
    >
      <div className="h-full  w-full flex justify-center  ">
        <div className="w-full md:w-[70%] relative">
          <div className="w-full  flex flex-col relative py-1 h-[calc(100%-5rem)] overflow-auto">
            {isPending
              ? "Loading..."
              : error
              ? "Something Went Wrong"
              : data?.history?.map((message, i) => (
                  <Fragment key={i}>
                    {message.img && (
                      <IKImage
                        urlEndpoint={import.meta.VITE_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height="300"
                        width="400"
                        transformation={[{ height: 300, width: 400 }]}
                        loading="lazy"
                        lqip={{
                          active: true,
                          quality: 20,
                        }}
                      />
                    )}
                    <div
                      className={
                        message.role === "user"
                          ? "p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end"
                          : "p-5"
                      }
                      key={i}
                    >
                      <Markdown>{message.parts[0].text}</Markdown>
                    </div>
                  </Fragment>
                ))}
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
          </div>
          {data && <NewPrompt add={add} image={image} setImage={setImage} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
