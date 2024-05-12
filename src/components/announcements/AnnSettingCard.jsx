import React, { useState } from 'react'
import CardUtil from '../utils/CardUtil'
import { Delete, Edit, UserPlus, Users, XIcon} from 'lucide-react'
import DeleteConfirm from '../utils/DeleteConfirm'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { useStore } from '@/stores/store'
import toast from 'react-hot-toast'

const AnnSettingCard = ({setToggle ,setToggleEdit}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [deleteToggle, setDeleteToggle] = useState(false);
    const ann_id = searchParams.get("ann_id");
    const access_token = Cookies.get("access_token");
    const setToggleCreateAnnouncement = useStore((state) => state.setToggleCreateAnnouncement);
    const handleDeleteGroup = () => {
      const newPromise = new Promise(async (resolve, reject) => {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/announcement/delete/${ann_id}/`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (response.ok) {
          setToggle(false);
          router.push("/groups");
          resolve();
        } else {
          const result = await response.json();
          setToggle(false);
          reject(result);
        }
      });
      toast.promise(newPromise, {
        loading: "Deleting announcement...",
        success: "Announcement deleted successfully!",
        error: (data) => data.errors[0].detail || "Failed to delete announcement",
      });
    };
    const handleEditGroup = () => {
        setToggleEdit(true)

    }
  return (
    <div className="flex flex-col p-2 pt-0 gap-6 relative">
      <div>
        <div className='flex justify-end absolute -right-7 -top-7'>
            <button  className="p-1 flex justify-center items-center dark:text-gray-400 cursor-pointer text-red-500 bg-white shadow-sm shadow-gray-900 rounded-full hover:bg-red-200" onClick={()=>setToggle(false)}>

            <XIcon size={36}/>
            </button>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter">Announcement Setting</h1>
        <p className="text-gray-500 ">Manage your Announcement settings and members</p>
      </div>
      <div className="flex flex-col gap-2 border-b pb-4">
        <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
          <CardUtil
            title="View Members"
            icon={
              <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          />
        </div>
        <div className="cursor-pointer hover:bg-gray-300 p-2 rounded-md">
          <CardUtil
            title="Manage Members"
            icon={
              <UserPlus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          onClick={handleEditGroup}
        >
          <CardUtil
            title="Edit Announcement"
            icon={
              <Edit className="h-5 w-5 text-green-500 dark:text-gray-400" />
            }
          />
        </div>

        <div
          className="cursor-pointer hover:bg-gray-300 p-2 rounded-md"
          onClick={() => setDeleteToggle(!deleteToggle)}
        >
          <CardUtil
            title="Delete Announcement"
            icon={
              <Delete className="h-5 w-5 text-red-500 dark:text-gray-400" />
            }
          />
        </div>
      </div>
      {deleteToggle && (
        <div
          className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${
            deleteToggle && "bg-black/30 "
          }`}
        >
          <DeleteConfirm title={"Delete Group"}>
            <div className="flex gap-4 ">
              <button
                onClick={() => setDeleteToggle(!deleteToggle)}
                className="px-6 py-2 bg-gray-600 rounded-full  text-white font-bold hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroup}
                className="px-6 py-2 bg-red-600 rounded-full  text-white font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>  
          </DeleteConfirm>
        </div>
      )}
    </div>
  )
}

export default AnnSettingCard