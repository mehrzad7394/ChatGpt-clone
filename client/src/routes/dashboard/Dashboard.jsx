import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (text) => {
      const token = await getToken();
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: text }),
      }).then((res) => res.json());
    },

    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  };
  return (
    <div className="h-full flex flex-col items-center py-2">
      <div className="flex-1 flex flex-col items-center justify-center w-[90%] gap-10">
        <div className="flex items-center gap-5 opacity-20">
          <img src="./logo.png" alt="" className="w-12 h-w-12" />
          <h1 className="text-2xl bg-gradient-to-r from-blue-500 to-green-100 bg-clip-text text-transparent uppercase">
            ChatGPt
          </h1>
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          {options?.map((option, i) => (
            <div
              className="flex flex-col font-light p-5 border-[#555] border rounded-2xl flex-1"
              key={i}
            >
              <img
                src={option?.img}
                alt=""
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm">{option?.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto w-[90%] bg-[#2c2937] rounded-3xl flex">
        <form
          className="w-full h-full flex items-center justify-between gap-5 mb-3"
          onSubmit={handleSubmit}
        >
          <input
            name="text"
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 p-5 text-sm bg-transparent outline-none text-[#ececec]"
          />
          <button className="bg-[#605e68] rounded-full border-none cursor-pointer p-3 items-center justify-center mr-5">
            <img src="./arrow.png" alt="" className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

const options = [
  {
    img: "/chat.png",
    text: "Create a New Chat",
  },
  {
    img: "/image.png",
    text: "Analyze Images",
  },
  {
    img: "/code.png",
    text: "Help me with my code",
  },
];
