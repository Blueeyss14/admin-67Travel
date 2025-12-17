import { useEffect, useState } from "react";
import { config } from "../../../config/config";
import { mapMessagesFromApi, mapUsersFromMessages } from "../data/chatData";

const getToken = () => localStorage.getItem("admin_token") || "";

export const useAdminChat = () => {
  const [chatList, setChatList] = useState([]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAllUsersMessages = async () => {
    const token = getToken();
    const res = await fetch(`${config.api}/message/users`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Gagal ambil pesan semua user");
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const allMessages = await fetchAllUsersMessages();
        const mapped = mapUsersFromMessages(allMessages);
        setChatList(mapped);
        setActiveChatIndex(0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const refreshActiveUser = async (userId, indexInList) => {
    const token = getToken();
    const res = await fetch(`${config.api}/message/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;

    const data = await res.json();
    const mappedMessages = mapMessagesFromApi(data);

    setChatList((prev) => {
      const copy = [...prev];
      if (!copy[indexInList]) return prev;
      copy[indexInList] = {
        ...copy[indexInList],
        messages: mappedMessages,
        lastMessage:
          mappedMessages.length > 0
            ? mappedMessages[mappedMessages.length - 1].message
            : "",
        timestamp:
          mappedMessages.length > 0
            ? mappedMessages[mappedMessages.length - 1].timestamp
            : copy[indexInList].timestamp,
      };
      return copy;
    });
  };

  const sendAdminMessage = async (userId, text, indexInList) => {
    const token = getToken();
    const body = { userId, userMessage: "", adminMessage: text };

    await fetch(`${config.api}/message/send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    await refreshActiveUser(userId, indexInList);
  };

  return {
    chatList,
    activeChatIndex,
    setActiveChatIndex,
    loading,
    sendAdminMessage,
    refreshActiveUser,
  };
};
