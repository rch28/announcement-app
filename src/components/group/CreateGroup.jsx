"use client";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateGroup = ({mode,data}) => {
  const router= useRouter()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const access_token = Cookies.get("access_token");
  const setToggleCreateGroup = useStore((state) => state.setToggleCreateGroup);
  const group_id = data?.group_id;

  const setAnnouncementGroup = useStore((state) => state.setAnnouncementGroup);
  const handleFileChange = async (e) => {
    if (!e.target.files[0].type.startsWith("image/")) {
      return;
    }
    setImage(e.target.files[0]);
  };
  useEffect(()=>{
    if(mode==="edit"){
      setName(data?.name)
      setDescription(data?.description)
      setCategory(data?.category)
    }
  },[mode])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Group name is required");
      return;
    }
    if (!description) {
      toast.error("Group description is required");
      return;
    }
    if (category === "any" || category === "") {
      toast.error("Please select a category");
      return;
    }
    if (!image && mode!=="edit") {
      toast.error("Group image is required");
      return;
    }
    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/group/${mode==="edit"?`update/${group_id}/`:"create/"}`,
        {
          method: mode==="edit"?"PATCH":"POST",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
          body: data,
        }
      );
      const result = await response.json();
      if (response.ok) {
        const res = await fetch("http://127.0.0.1:8000/api/v1/group/created-by/user/?limit=100", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (res.ok) {
          const result = await res.json();
          const lastCreatedGroup = result.results[result.results.length - 1];
          const lastCreatedGroupId = lastCreatedGroup.group_id;
          router.push(`/groups/${name}?group_id=${lastCreatedGroupId}&&category=${category}`);

        }
        setToggleCreateGroup(false);
        resolve(result);
      } else {
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: mode==="edit"?"Updating group...":"Creating group...",
      success: mode==="edit"?"Group updated successfully!":(data) => data?.msg || "Group created successfully!",
      error: (result) => result.errors[0].detail || "An error occurred",
    });
  };

  const options = [
    { value: "any", label: "Any Category" },

    { value: "web", label: "Web" },
    { value: "network", label: "Network" },
    { value: "cyber", label: "Cyber Security" },
    { value: "cloud", label: "Cloud" },
    { value: "art", label: "Art" },
    { value: "food", label: "Food" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "sports", label: "Sports" },
    { value: "travel", label: "Travel" },
    { value: "other", label: "Other" },
  ];
  return (
    <div className="bg-white mx-4 w-96 rounded-xl border-2  shadow-lg shadow-gray-500 ">
      <div className="flex justify-end items-center pt-4 px-4">
        <button
          onClick={() => setToggleCreateGroup(false)}
          className="px-2 py-1 bg-violet-500 hover:bg-violet-600 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
      <div className="">
        <form
          action=""
          className=" p-4 pt-0 rounded-md"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className="text-center text-2xl py-4 font-bold tracking-widest">
            {mode==="edit"?"Edit Your group":"Create New Group"}
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="group_name"
              id="group_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
            />
            <label
              htmlFor="group_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Group name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              type="text"
              name="group_description"
              id="group_description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
            />
            <label
              htmlFor="group_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2 py-2 rounded-lg font-bold sm:w-72 focus:outline-none bg-white text-gray-600 border border-gray-300 shadow-sm focus:border-purple-300 focus:shadow-sm "
            >
              {options.map((option) => (
                <option
                  className="w-fit py-2 px-4"
                  key={option.value}
                  value={ option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="group_image"
              id="group_image"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-100 file:text-violet-700
            hover:file:bg-violet-400 shadow-sm shadow-gray-100"
              onChange={handleFileChange}
              placeholder=" "
            />
          </div>
          <div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300  font-bold rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                {
                  mode==="edit"?"Update Group":"Create Group"
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
