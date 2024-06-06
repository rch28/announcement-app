"use client";
import { useStore } from "@/stores/store";
import Cookies from "js-cookie";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CreateGroup = ({ mode, data }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [groupType, setGroupType] = useState("")
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
  useEffect(() => {
    if (mode === "edit") {
      setName(data?.name);
      setDescription(data?.description);
      setCategory(data?.category);
    }
  }, [mode]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(groupType);
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
    if(groupType === ""){
      toast.error("Please select a group type")
      return;
    }
    if (!image && mode !== "edit") {
      toast.error("Group image is required");
      return;
    }
    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("group_type", groupType)
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/group/${
          mode === "edit" ? `update/${group_id}/` : "create/"
        }`,
        {
          method: mode === "edit" ? "PATCH" : "POST",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
          body: data,
        }
      );
      const result = await response.json();
      if (response.ok) {
        const res = await fetch(
          "http://127.0.0.1:8000/api/v1/group/created-by/user/?limit=100",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (res.ok) {
          const result = await res.json();
          const lastCreatedGroup = result.results[result.results.length - 1];
          const lastCreatedGroupId = lastCreatedGroup.group_id;
          router.push(
            `/groups/${name}?group_id=${lastCreatedGroupId}&&category=${category}`
          );
        }
        setToggleCreateGroup(false);
        resolve(result);
      } else {
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: mode === "edit" ? "Updating group..." : "Creating group...",
      success:
        mode === "edit"
          ? "Group updated successfully!"
          : (data) => data?.msg || "Group created successfully!",
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
  const group_type= [
    {value: "", label: "Select Type"},
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ]
  return (
    <div className="bg-white mx-4  rounded-xl border-2  w-[90%] md:w-auto shadow-lg shadow-gray-500 relative z-20 p-4 dark:shadow-none">
      <div className="flex justify-end items-center  absolute right-4 top-2 ">
        <button
          onClick={() => setToggleCreateGroup(false)}
          className="p-1 bg-white text-red-500 hover:bg-red-200 rounded-full border  shadow-md shadow-gray-500"
        >
          <XIcon />
        </button>
      </div>
      <div className="p-4">
        <h1 className="text-lg md:text-2xl  font-bold tracking-widest text-black">
          {mode === "edit" ? "Edit Your group" : "Create New Group"}
        </h1>
        <CardDescription className="text-sm text-gray-900 dark:text-gray-700">
          {mode === "edit" ? "Edit your Group." : "Create a new group."}
        </CardDescription>
      </div>
      <div className="">
        <form
          action=""
          className=" p-4 pt-0 rounded-md"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="grid gap-4 md:grid-cols-2 ">
            <div className="grid gap-4">
              <div className=" md:space-y-2">
                <Label className="hidden md:flex " htmlFor="group_name">Group name</Label>
                <Input
                  type="text"
                  name="group_name"
                  id="group_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter group name"
                  className="border border-gray-600 focus:border-purple-500 bg-white"
                />
              </div>
              <div className="">
                <Label className="hidden md:flex " htmlFor="group_description">Description</Label>
                <Textarea
                  type="text"
                  name="group_description"
                  id="group_description"
                  className="border border-gray-600 focus:border-purple-500  sm:h-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Group Description "
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className=" group md:space-y-2">
                <Label className="hidden md:flex " htmlFor="category">Select Category</Label>

                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-600  focus:border-purple-500 rounded-md focus:outline-none text-sm font-medium appearance-none "
                >
                  {options.map((option) => (
                    <option
                      className="w-fit py-2 px-4 text-black"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" group md:space-y-2">
                <Label className="hidden md:flex " htmlFor="groupType">Select Type</Label>

                <select
                  name="groupType"
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-600  focus:border-purple-500 rounded-md focus:outline-none text-sm font-medium appearance-none "
                >
                  {group_type.map((type) => (
                    <option
                      className="w-fit py-2 px-4 text-black"
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <Label className="hidden md:flex " htmlFor="group_image ">Image</Label>
                <input
                  type="file"
                  name="group_image"
                  id="group_image"
                  className="block  px-1 w-full text-sm text-gray-900 bg-transparent border-0  appearance-none  focus:outline-none focus:ring-0  peer file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold rounded-md
            file:bg-violet-100 file:text-violet-700
            hover:file:bg-violet-400 shadow-sm shadow-gray-100 focus:border focus:border-purple-400"
                  onChange={handleFileChange}
                  placeholder=" "
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300  font-bold rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
              >
                {mode === "edit" ? "Update Group" : "Create Group"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
