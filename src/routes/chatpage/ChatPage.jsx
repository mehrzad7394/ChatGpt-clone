import NewPrompt from "../../components/NewPrompt";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-full relative h-[calc(100vh - 4rem)]">
      {/* Scrollable content */}
      <div className="h-full  w-full">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="p-2">
            Content #{i + 1}
          </div>
        ))}
      </div>

      {/* Absolute positioned element */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 w-auto text-center p-4">
        end
      </div>
    </div>
  );
};

export default ChatPage;

{
  /* <div className="  w-full justify-center flex overflow-auto">
        <div className="w-[50%] flex flex-col relative">
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
          <div className="p-5">Text Message ai</div>
          <div className="p-5 bg-[#2c2937] rounded-3xl max-w-[80%] self-end">
            Text Message From user
          </div>
        </div>
        
      </div>
      <div className=" bg-red-50">asdasdsadasda</div> */
}
