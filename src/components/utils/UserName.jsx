"use client"

import { useStore } from "@/stores/store";


const UserName = () => {
  const userData = useStore((state) => state.userData);
  return (
    <div className="flex items-center gap-2 md:my-4 px-2">
      <h1 className="text-lg font-bold capitalize">{userData?.first_name} </h1>
      <h1 className="text-lg font-bold capitalize">{userData?.last_name}</h1>
    </div>
  );
};

export default UserName;
