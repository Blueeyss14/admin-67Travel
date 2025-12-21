import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";
import { useAdminChat } from "../hook/useAdminChat";

const Chat = () => {
  const {
    chatList,
    activeChatIndex,
    setActiveChatIndex,
    loading,
    sendAdminMessage,
    refreshAllChats
  } = useAdminChat();

  const activeChatData = chatList[activeChatIndex] || null;

  const handleSendMessage = async (text) => {
    if (!activeChatData) return;
    await sendAdminMessage(activeChatData.id, text, activeChatIndex);
  };

  if (loading && chatList.length === 0) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <p className="text-gray-600">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <ChatSidebar
        chatData={chatList}
        activeChat={activeChatIndex}
        onChatSelect={setActiveChatIndex}
      />
      <ChatArea
        activeChatData={activeChatData}
        onSendMessage={handleSendMessage}
        onRefresh={refreshAllChats}
      />
    </div>
  );
};

export default Chat;
