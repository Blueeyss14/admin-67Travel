import { useState } from 'react';
import { chatData } from '../data/chatData';
import ChatSidebar from '../components/ChatSidebar';
import ChatArea from '../components/ChatArea';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(0);

  return (
    <div className="flex w-full h-screen">
      <ChatSidebar 
        chatData={chatData}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
      />
      <ChatArea 
        activeChatData={chatData[activeChat]}
      />
    </div>
  );
};

export default Chat;