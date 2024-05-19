import { Cog } from "lucide-react";
import SettingHover from "./SettingHover";

const GroupCard = ({ group, setDeleteToggle, setGroupId }) => {
  return (
    <div className="bg-white shadow-lg shadow-gray-400  rounded-xl p-6  hover:scale-105 transition-all ease-linear duration-200 ">
      <div className="grid gap-4">
        <h1 className="text-xl font-bold text-gray-800">{group.name}</h1>
        <div className="flex justify-between ">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setDeleteToggle((prev) => !prev);
                setGroupId(group.group_id);
              }}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300 text-sm"
            >
              Delete
            </button>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-300">
              Edit
            </button>
          </div>
          <div className="bg-gray-300 shadow-xl shadow-gray-500 rounded-full p-1 group relative ">
            <Cog className="text-gray-800 hover:text-gray-900 group-hover:rotate-45 cursor-pointer transition duration-300 " />
            <div className="absolute right-0 bottom-6 hidden p-4 rounded-xl shadow-md shadow-gray-500 group-hover:flex  bg-white w-72">
              <SettingHover id={group.group_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
