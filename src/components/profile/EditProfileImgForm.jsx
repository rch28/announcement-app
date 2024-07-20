import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { XCircle, XIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EditProfileForm = ({ setToggle }) => {
  const [file, setFile] = useState("");
  const access_token = Cookies.get("access_token");

  const SetUserData = useStore((state) => state.setUserData);
  const handleFileChange = async (e) => {
    if (!e.target.files[0].type.startsWith("image/")) {
      return;
    }
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("select the profile");
      return;
    }
    const formData = new FormData();
    formData.append("profilepic", file);
    const newPromise = new Promise(async (resolve, reject) => {
      const respone = await fetch(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/user/update/`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });
      if (respone.ok) {
        const result = await respone.json();
        SetUserData(result);
        setToggle(false);
        resolve();
      } else {
        const result = await respone.json();
        reject(result);
      }
    });

    toast.promise(newPromise, {
      loading: "Uploading....",
      success: "Profile Uploaded!!",
      error: (data) => (data ? data.errors[0].detail : "Upload Failed!!"),
    });
  };
  return (
    <div className="relative">
      <div className="w-96 rounded-xl mx-auto bg-white  border border-gray-400 shadow-md shadow-gray-600">
        <div className="flex justify-end p-2 ">
          <span
            className="text-red-500 hover:bg-red-200 cursor-pointer p-1 rounded-full bg-white shadow-md shadow-gray-600"
            onClick={() => setToggle(false)}
          >
            <XIcon/>
          </span>
        </div>
        <form
          className="flex p-4  my-2"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="file"
            className="
            flex-1 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-300
            "
            name="profile_image"
            id="profile_Image"
            onChange={handleFileChange}
          />
          <input
            type="submit"
            value="Upload"
            className="bg-purple-500 text-white px-6 py-1 rounded-full font-bold hover:bg-purple-600"
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
