import colors from "../../../res/colors";
import Destionation from "../../Destination/views/Destionation";
import Chat from "../../Chat/views/Chat";
import Location from "../../Location/views/Location";
import Vehicle from "../../Vehicle/views/Vehicle";
import User from "../../User/views/User";
import Notification from "../../Notification/views/Notification";
import { useState } from "react";
import { Assets } from "../../../res/assets";
import { useNavigate } from "react-router-dom";

const AdminNavigation = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();
  const dashboard = [
    {
      name: "Add Destionation",
      destination: <Destionation />,
      icon: Assets.PlusIcon,
    },
    { name: "Add Location", destination: <Location />, icon: Assets.PlusIcon },
    { name: "Add Vehicle", destination: <Vehicle />, icon: Assets.PlusIcon },
    { name: "Messages", destination: <Chat />, icon: Assets.ChatIcon },
    { name: "User Info", destination: <User />, icon: Assets.InfoIcon },
    {
      name: "Notification",
      destination: <Notification />,
      icon: Assets.NotificationIcon,
    },
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div
        style={{ backgroundColor: colors.hytam, color: colors.hytam }}
        className="w-100 h-full box-border py-4 px-8"
      >
        <div className="flex w-full items-center gap-3 mt-3 mb-5 ">
          <h1 className="font-bold text-white text-2xl">67Travel</h1>
          <img className="w-10 h-10 whitee-filter" src={Assets.PlaneIcon} />
        </div>
        <div className="w-full h-full flex flex-col gap-2">
          {dashboard.map((dest, index) => (
            <div
              key={index}
              className={`p-2.5 rounded-[5px] cursor-pointer hover:bg-white/50 ${
                selectedItem === index
                  ? "bg-white/50 shadow shadow-white/20"
                  : ""
              } `}
              onClick={() => setSelectedItem(index)}
            >
              <div className="flex w-full h-full gap-4 items-center">
                <img className="w-4 h-4 whitee-filter" src={dest.icon} />
                <h2 className="text-white">{dest.name}</h2>
              </div>
            </div>
          ))}
          <div
            className={`p-2.5 rounded-[5px] cursor-pointer hover:bg-white/50 "bg-white/50  "
            } `}
            onClick={() => navigate("/", { replace: true })}
          >
            <div className="flex w-full h-full gap-4 items-center">
              <img className="w-4 h-4 whitee-filter" src={Assets.LogoutIcon} />
              <h1 className="text-white">Logout</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full">
        {dashboard[selectedItem]?.destination}
      </div>
    </div>
  );
};

export default AdminNavigation;
