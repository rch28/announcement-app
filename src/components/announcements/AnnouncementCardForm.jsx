"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAllData, GetAccessToken } from "../../index";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import('../layout/QuillEditor'), { ssr: false });

import { Textarea } from "../ui/textarea";
import { InfoIcon } from "lucide-react";

export default function AnnouncementCardForm() {
  const titleRef = useRef(null);
  const contactNameRef = useRef(null);
  const contactEmailRef = useRef(null);
  const locationRef = useRef(null);
  const imageDescriptionRef = useRef(null);
  const dateRef = useRef(null);
  const imageRef = useRef(null);
  const groupRef = useRef(null);
  const typeRef = useRef(null);
  const visibilityRef = useRef(null);
  const descriptionRef = useRef(null);
  const [focusedField, setFocusedField] = useState(null);
  const [userJoinedGroup, setUserJoinedGroup] = useState([]);

  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const edit = searchParams.get("edit");
  const ann_id = searchParams.get("ann_id");
  const selectGroup = searchParams.get("select_group");
  const [groupData, setGroupData] = useState({});
  const [ann_data, setAnnouncementData] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("");
  const [announcemenType, setAnnouncemenType] = useState("");
  const [announcement_visibility, setAnnouncement_visibility] = useState("");

  const [selected_group, setSelected_group] = useState({});
  const [imageChanged, setImageChanged] = useState(false);
  
  const access_token = Cookies.get("access_token");
  const userData = useStore((state) => state.userData);
  const userId = userData?.id;
  const router = useRouter();

  const announcement_type = [
    { value: "", label: "Select Type" },
    { value: "event", label: "Event" },
    { value: "news", label: "News" },
    { value: "update", label: "Update" },
    { value: "offer", label: "Offer" },
    { value: "product launch", label: "Product Launch" },
    { value: "training", label: "Training" },
    { value: "bootcamp", label: "Bootcamp" },
  ];
  const announcementVisibility = [
    { value: "", label: "Select Visibility" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const handleFileChange = async (e) => {
    if (!e.target.files[0].type.startsWith("image/")) {
      return;
    }
    setImage(e.target.files[0]);
    setImageChanged(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const allData = await fetchAllData(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/joined-by/user/?limit=10&offset=0/`
      );
      setUserJoinedGroup(allData);
    };
    fetchData();
  }, [selectGroup]);
  useEffect(() => {
    if (group_id) {
      const fetchGroup = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/retrieve/${group_id}/`
          );
          if (!response.ok) return;
          const result = await response.json();
          setGroupData(result);
        } catch (error) {
          console.error(error);
        }
      };
      fetchGroup();
    }
  }, [group_id]);

  useEffect(() => {
    if (edit && ann_id) {
      const fetchAnnouncement = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/retrieve/${ann_id}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${GetAccessToken()}`,
              },
            }
          );
          if (!response.ok) {
            console.error("Something went wrong!!");
            return;
          }
          const result = await response.json();
          setAnnouncementData(result);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAnnouncement();
    }
  }, [edit, ann_id]);
  useEffect(() => {
    if (ann_data) {
      setTitle(ann_data.title);
      setDescription(ann_data.description);
      setGroup(ann_data.group);
      setImage(ann_data.image);
      setImageChanged(false);
      setImageDescription(ann_data.image_description);
      setAnnouncemenType(ann_data?.announcement_type);
      setAnnouncement_visibility(ann_data?.announcement_visibility);
      setContactEmail(ann_data?.contact_email);
      setContactName(ann_data?.contact_name);
      setLocation(ann_data?.location);
      setDate(ann_data?.date);
    }
    if (group_id) {
      setGroup(group_id);
    }
  }, [ann_data, group_id]);
  useEffect(() => {
    if (selectGroup && group) {
      const [filteredGroup] = userJoinedGroup.filter(
        (g) => g.group_id === group
      );
      setSelected_group(filteredGroup);
    }
  }, [group, selectGroup, userJoinedGroup]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      titleRef.current.focus();
      toast.error("Title is required");
      return;
    }

    if (!announcemenType) {
      typeRef.current.focus();
      toast.error("Select the announcement type");
      return;
    }
    if (!announcement_visibility) {
      visibilityRef.current.focus();
      toast.error("Select the announcement visibility");
      return;
    }
    if (!group) {
      groupRef.current.focus();
      toast.error("Select the group");
      return;
    }
    if (!image) {
      imageRef.current.focus();
      toast.error("Image is required");
      return;
    }

    if (!description) {
      toast.error("Description is required");
      return;
    }
    const data = new FormData();
    if (imageChanged) {
      data.append("image", image);
    }

    data.append("title", title);
    data.append("description", description);
    data.append("group", group);
    data.append("user", userId);
    data.append("contact_name", contactName);
    data.append("contact_email", contactEmail);
    data.append("location", location);
    data.append("date", date);
    data.append("image_description", imageDescription);
    data.append("announcement_type", announcemenType);
    data.append("announcement_visibility", announcement_visibility);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/announcement/${
          ann_data ? `update/${ann_data?.id}/` : "create/"
        }`,
        {
          method: ann_data ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: data,
        }
      );
      if (response.ok) {
        const result = await response.json();

        if (ann_data) {
          router.push(`/announcements/${title}?ann_id=${ann_data.id}`);
        }
        if (selectGroup) {
          router.push(
            `/groups/${selected_group?.name}?group_id=${selected_group?.group_id}`
          );
        }else{

          router.push(`/groups/${groupData?.name}?group_id=${groupData?.group_id}&&category=${groupData?.category}`)
        }
        resolve(result);
      } else {
        const result = await response.json();
        console.log(result);
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: ann_data
        ? "Annoucement Updating..."
        : "Creating Announcement...",
      success: ann_data
        ? "Announcement Updated."
        : "Announcement created successfully",
      error: (err) => {
        return err?.errors[0].detail;
      },
    });
  };
  const fieldInfo = {
    title: "Please enter a descriptive title for the announcement.",
    contactName: "Enter the full name of the contact person.",
    contactEmail: "Enter a valid email address for contact.",
    location: "Enter the location of the event.",
    image_description: "Enter a description for the image.",
    date: "Enter a detailed description of the announcement.",
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="relative m-4 w-[90%] sm:w-auto "
    >
      <div className={`w-full  rounded-xl  bg-purple-50 dark:bg-gray-950 `}>
        <CardHeader>
          <CardTitle> {ann_data ? "Edit" : "New"} Announcement</CardTitle>
          <CardDescription>
            {ann_data
              ? "Edit the announcement information"
              : "Create a new announcement for this group."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid">
          <div className="grid sm:grid-cols-2 sm:gap-4">
            <div className="grid gap-4 ">
              <div className="md:space-y-2 relative">
                {focusedField === "title" && titleRef.current && (
                  <span
                    className="absolute right-4"
                    data-tooltip-id="title-tooltip"
                    data-tooltip-content={fieldInfo.title}
                    data-tooltip-place="top"
                  >
                    <InfoIcon className="h-5 w-5" />
                  </span>
                )}
                <Label htmlFor="title" className="">
                  Title *
                </Label>
                <Input
                  ref={titleRef}
                  id="title"
                  value={title}
                  autoComplete="off"
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setFocusedField("title")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter announcement title"
                  className="border border-gray-600 focus:border-purple-500 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent"
                />
                <Tooltip id="title-tooltip" />
              </div>
              <div className="md:space-y-2 relative">
                {focusedField === "contactName" && contactNameRef.current && (
                  <span
                    className=" absolute right-4 z-50"
                    data-tooltip-id="contactName-tooltip"
                    data-tooltip-content={fieldInfo.contactName}
                    data-tooltip-place="top-end"
                  >
                    <InfoIcon className="h-5 w-5" />
                  </span>
                )}
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  ref={contactNameRef}
                  id="contactName"
                  value={contactName}
                  autoComplete="off"
                  onChange={(e) => setContactName(e.target.value)}
                  onFocus={() => setFocusedField("contactName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter contact information"
                  className="border border-gray-600 focus:border-purple-500 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent"
                />
                <Tooltip id="contactName-tooltip" />
              </div>
              <div className="md:space-y-2 relative">
                {focusedField === "contactEmail" && contactNameRef.current && (
                  <span
                    className=" absolute right-4 z-50"
                    data-tooltip-id="contactEmail-tooltip"
                    data-tooltip-content={fieldInfo.contactEmail}
                    data-tooltip-place="top-end"
                  >
                    <InfoIcon className="h-5 w-5" />
                  </span>
                )}
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  ref={contactEmailRef}
                  id="contactEmail"
                  value={contactEmail}
                  autoComplete="off"
                  onChange={(e) => setContactEmail(e.target.value)}
                  onFocus={() => setFocusedField("contactEmail")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter Contact Email"
                  className="border border-gray-600 focus:border-purple-500 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent"
                />
                <Tooltip id="contactEmail-tooltip" />
              </div>
              <div className="md:space-y-2 relative">
                {focusedField === "location" && contactNameRef.current && (
                  <span
                    className=" absolute right-4 z-50"
                    data-tooltip-id="location-tooltip"
                    data-tooltip-content={fieldInfo.location}
                    data-tooltip-place="top-end"
                  >
                    <InfoIcon className="h-5 w-5" />
                  </span>
                )}
                <Label htmlFor="location">Event Location</Label>
                <Input
                  ref={locationRef}
                  id="location"
                  value={location}
                  autoComplete="off"
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setFocusedField("location")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter Event Location"
                  className="border border-gray-600 focus:border-purple-500 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent"
                />
                <Tooltip id="location-tooltip" />
              </div>
            </div>
            <div className="grid gap-4">
              {selectGroup ? (
                <div className="md:space-y-2 relative z-0">
                  <Label htmlFor="group-name">Select Group *</Label>

                  <select
                    ref={groupRef}
                    name="group_name"
                    id="group_name "
                    className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-600  focus:border-purple-500 placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent rounded-md focus:outline-none text-sm font-medium appearance-none  "
                    value={group}
                    autoComplete="off"
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="">Select group</option>
                    {userJoinedGroup?.map((group) => (
                      <option
                        key={group.group_id}
                        value={group.group_id}
                        autoComplete="off"
                        className="text-black "
                      >
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="md:space-y-2 relative">
                    <Label htmlFor="group">Select Group *</Label>
                    <select
                      name="group"
                      id="group"
                      value={group}
                      autoComplete="off"
                      className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-600  focus:border-purple-500 placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent rounded-md focus:outline-none text-sm font-medium appearance-none  "
                      disabled
                    >
                      <option>{groupData.name}</option>
                    </select>
                  </div>
                </>
              )}
              <div className="md:space-y-2 relative">
                <Label className="" htmlFor="announcementType">
                  Select Type *
                </Label>

                <select
                  ref={typeRef}
                  name="announcementType"
                  value={announcemenType}
                  autoComplete="off"
                  onChange={(e) => setAnnouncemenType(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-600  focus:border-purple-700 placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent rounded-md focus:outline-none text-sm font-medium appearance-none "
                >
                  {announcement_type.map((type) => (
                    <option
                      className="w-fit py-2 px-4 text-black"
                      key={type.value}
                      value={type.value}
                      autoComplete="off"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:space-y-2 relative">
                <Label className="" htmlFor="announcementType">
                  Select Visibility *
                </Label>

                <select
                  ref={visibilityRef}
                  name="announcementType"
                  value={announcement_visibility}
                  autoComplete="off"
                  onChange={(e) => setAnnouncement_visibility(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-600  focus:border-purple-700 placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent rounded-md focus:outline-none text-sm font-medium appearance-none "
                >
                  {announcementVisibility.map((type) => (
                    <option
                      className="w-fit py-2 px-4 text-black"
                      key={type.value}
                      value={type.value}
                      autoComplete="off"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:space-y-2 relative">
                {focusedField === "date" && contactNameRef.current && (
                  <span
                    className=" absolute right-4 z-50"
                    data-tooltip-id="date-tooltip"
                    data-tooltip-content={fieldInfo.date}
                    data-tooltip-place="top-end"
                  >
                    <InfoIcon className="h-5 w-5" />
                  </span>
                )}
                <Label htmlFor="date">Date</Label>
                <Input
                  ref={dateRef}
                  id="date"
                  value={date}
                  autoComplete="off"
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={() => setFocusedField("date")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter date"
                  className="border border-gray-600 focus:border-purple-500 dark:text-white placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent"
                />
                <Tooltip id="date-tooltip" />
              </div>
            </div>
          </div>
          <div className="md:space-y-2 relative mt-4 grid md:flex  gap-4 ">
            <div className="md:space-y-2 relative flex-1">
              {focusedField === "imgDescription" && contactNameRef.current && (
                <span
                  className=" absolute right-4 z-50"
                  data-tooltip-id="imgDescription-tooltip"
                  data-tooltip-content={fieldInfo.image_description}
                  data-tooltip-place="top-end"
                >
                  <InfoIcon className="h-5 w-5" />
                </span>
              )}
              <Label htmlFor="imageDescription">Image Description</Label>
              <Textarea
                ref={imageDescriptionRef}
                id="imageDescription"
                value={imageDescription}
                autoComplete="off"
                onChange={(e) => setImageDescription(e.target.value)}
                onFocus={() => setFocusedField("imgDescription")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter Image Description"
                className="border border-gray-600  focus:border-purple-500  placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent"
              />
              <Tooltip id="imgDescription-tooltip" />
            </div>
            <div className="flex-1">
              <Label htmlFor="image">Image</Label>
              <Input
                ref={imageRef}
                id="image"
                type="file"
                onChange={handleFileChange}
                className=" dark:border-gray-600 focus:border focus:border-purple-400 placeholder:text-gray-600 dark:placeholder:text-slate-300 dark:bg-transparent dark:text-white"
              />
            </div>
          </div>
          <div className="md:space-y-2 relative mt-2">
            <Label htmlFor="description">Description *</Label>
            <QuillEditor value={description} onChange={setDescription} size={300} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className={
              "text-white bg-purple-700 hover:bg-purple-800 focus:outline-none  font-bold rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            }
          >
            Post Announcement
          </Button>
        </CardFooter>
      </div>
    </form>
  );
}
