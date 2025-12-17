import { useState } from "react";

const ChatArea = ({ activeChatData, onSendMessage }) => {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    if (onSendMessage) {
      onSendMessage(messageInput.trim());
    }
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!activeChatData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4  border-b border-black/10">
        <div className="flex items-center gap-3">
          <img
            src={activeChatData.profile}
            alt={activeChatData.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {activeChatData.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(!activeChatData.messages || activeChatData.messages.length === 0) && (
          <p className="text-gray-600 text-center">Belum ada pesan</p>
        )}

        {activeChatData.messages &&
          activeChatData.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${"bg-white text-gray-800 border border-black/10"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={message.profile}
                    alt={message.role}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                <span className="text-xs font-semibold">{message.role}</span>
                </div>
                <p className="text-sm">{message.message}</p>
                <div className={`text-xs mt-1 ${"text-gray-500"}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="p-4 border-t border-black/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/30"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
