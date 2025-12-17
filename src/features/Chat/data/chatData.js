import { config } from "../../../config/config";

function formatHour(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function mapMessagesFromApi(rawData) {
  if (!Array.isArray(rawData)) return [];

  return rawData
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .flatMap((item) => {
      const baseProfile = item.user_profile_photo
        ? `${config.assetBase}/storage/${item.user_profile_photo}`
        : "/images/annonymous.png";

      const msgs = [];

      if (item.userMessage) {
        msgs.push({
          profile: baseProfile,
          message: item.userMessage,
          isUser: true,
          role: item.userName,
          timestamp: formatHour(item.timestamp),
        });
      }

      if (item.adminMessage) {
        msgs.push({
          profile: "/images/image1.jpg",
          message: item.adminMessage,
          isUser: false,
          role: "Admin",
          timestamp: formatHour(item.timestamp),
        });
      }

      return msgs;
    });
}

export function mapUsersFromMessages(rawData) {
  const byUser = new Map();

  rawData.forEach((item) => {
    const existing = byUser.get(item.userId) || [];
    existing.push(item);
    byUser.set(item.userId, existing);
  });

  return Array.from(byUser.entries()).map(([userId, messages]) => {
    const last = messages.reduce((a, b) =>
      new Date(a.timestamp) > new Date(b.timestamp) ? a : b
    );

    let lastMessageText = last.adminMessage || last.userMessage || "";

    if (last.adminMessage) {
      lastMessageText = `admin: ${lastMessageText}`;
    } else if (last.userMessage) {
      lastMessageText = `you: ${lastMessageText}`;
    }

    return {
      id: userId,
      name: last.userName,
      profile: last.user_profile_photo
        ? `${config.api_storage ?? config.api}/${last.user_profile_photo}`
        : "/images/annonymous.png",
      lastMessage: lastMessageText,
      timestamp: last.timestamp,
      messages: mapMessagesFromApi(messages),
    };
  });
}
