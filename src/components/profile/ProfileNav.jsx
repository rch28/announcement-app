import React from "react";

const ProfileNav = () => {
  return (
    <div className="md:w-96 mx-auto p-2">
      <nav className="">
        <ul className="flex gap-3 items-center  overflow-scroll md:overflow-hidden ">
          <li className="bg-orange-600 text-white outline py-2 px-4 rounded-full cursor-pointer">
            <a href="/profile">Profile</a>
          </li>

        {/* for admin only */}

          <li className=" border border-gray-300 hover:bg-slate-300 cursor-pointer py-2 px-4 rounded-full">
            <a href="#">item1</a>
          </li>
          <li className=" border border-gray-300 hover:bg-slate-300 cursor-pointer py-2 px-4 rounded-full">
            <a href="#">item1</a>
          </li>
          <li className=" border border-gray-300 hover:bg-slate-300 cursor-pointer py-2 px-4 rounded-full">
            <a href="#">item1</a>
          </li>
       
        </ul>
      </nav>
      
    </div>
  );
};

export default ProfileNav;
