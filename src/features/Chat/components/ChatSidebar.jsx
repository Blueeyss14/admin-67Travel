const ChatSidebar = ({ chatData, activeChat, onChatSelect }) => {
  return (
    <div className="w-[30%] h-full border border-black/10">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Chats</h2>
      </div>
      <div className="overflow-y-auto h-full">
        {chatData.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(index)}
            className={`p-4 border-b border-black/10 cursor-pointer hover:bg-gray-100 ${
              activeChat === index ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={chat.profile}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;