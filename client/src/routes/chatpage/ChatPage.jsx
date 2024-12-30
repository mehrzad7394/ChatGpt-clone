import { useEffect, useState } from "react";
import NewPrompt from "../../components/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const [height, setHeight] = useState(null);
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
                  <>
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
                  </>
                ))}
          </div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
