import colors from "../../../res/colors";
import Destionation from "../../Destination/views/Destionation";
import Chat from "../components/Chat";
import Location from "../../Location/views/Location";
import { useState } from "react";

const AdminNavigation = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const dashboard = [
    { name: "Add Destionation", destination: <Destionation /> },
    { name: "Add Location", destination: <Location /> },
    { name: "Messages", destination: <Chat /> },
  ];

  return (
    <div className="flex w-full h-screen">
      <div
        style={{ backgroundColor: colors.hytam, color: colors.hytam }}
        className="w-100 h-full box-border py-4 px-8"
      >
        <div className="w-full flex flex-col gap-2">
          {dashboard.map((dest, index) => (
            <div
              key={index}
              className={`p-2.5 rounded-[5px] cursor-pointer hover:bg-white/50 ${
                selectedItem === index ? "bg-white/50 shadow shadow-white/40" : ""
              } `}
              onClick={() => setSelectedItem(index)}
            >
              <h2 className="text-white">{dest.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 h-full">
        {dashboard[selectedItem]?.destination}
      </div>
    </div>
  );
};

export default AdminNavigation;
