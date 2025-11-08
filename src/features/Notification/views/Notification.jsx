import { useState } from "react";
import { Assets } from "../../../res/assets";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from Felicia",
      time: "2 min ago",
      type: "message",
      read: false,
    },
    {
      id: 2,
      title: "Booking Confirmed",
      message: "User booking at Hotel Telyu Sigma has been confirmed",
      time: "1 hour ago",
      type: "booking",
      read: false,
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "Payment for order #12345 has been processed",
      time: "3 hours ago",
      type: "payment",
      read: true,
    },
    {
      id: 4,
      title: "New Feature",
      message: "Check out our new destination recommendations",
      time: "1 day ago",
      type: "system",
      read: true,
    },
    {
      id: 5,
      title: "Reminder",
      message: "Don't forget to complete your profile",
      time: "2 days ago",
      type: "reminder",
      read: true,
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return Assets.MessageSticker;
      case "booking":
        return Assets.BookingSticker;
      case "payment":
        return Assets.PaymentSticker;
      case "system":
        return Assets.NotificationSticker;
      case "reminder":
        return Assets.ReminderSticker;
      default:
        return Assets.NotificationSticker;
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <div className="flex items-center gap-4">
          <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
            {notifications.filter((n) => !n.read).length} new
          </span>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
              >
                Mark All Read
              </button>
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border-l-4 ${
              notification.read
                ? "bg-gray-50 border-gray-300"
                : "bg-blue-50 border-blue-500"
            } shadow-sm hover:shadow-md transition-shadow relative group`}
          >
            <button
              onClick={() => handleDelete(notification.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

            <div className="flex items-start gap-3">
                <img src={getIcon(notification.type)} className="w-8 h-8" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3
                    className={`font-semibold ${
                      notification.read ? "text-gray-700" : "text-gray-900"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col justify-center items-center py-8">
          <img src={Assets.NotificationSticker} className="w-10 h-10" />
          <h3 className="text-lg font-semibold text-gray-600">
            No notifications
          </h3>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
