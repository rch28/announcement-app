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
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useStore } from "@/stores/store";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchAllData } from "@/index";

export function AnnouncementCardForm({
  group_id,
  selectGroup,
  ann_data,
  redirect

}) {
  const [userJoinedGroup, setUserJoinedGroup] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("khalti");
  const [group, setGroup] = useState("");
  const [selected_group, setSelected_group] = useState({});

  const [imageChanged, setImageChanged] = useState(false);
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );
  const access_token = Cookies.get("access_token");
  const userData = useStore((state) => state.userData);
  const userId = userData?.id;
  const router = useRouter();
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
        "http://127.0.0.1:8000/api/v1/group/joined-by/user/?limit=10&offset=0/"
      );
      setUserJoinedGroup(allData);
    };
    fetchData();
  }, [selectGroup]);
  useEffect(() => {
    if (ann_data) {
      setTitle(ann_data.title);
      setDescription(ann_data.description);
      setPaymentMethod(ann_data.payment_method);
      setGroup(ann_data.group);
      setImage(ann_data.image);
      setImageChanged(false);
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
  }, [group, selectGroup]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }
    if (!paymentMethod) {
      toast.error("Payment Method is required");
      return;
    }
    if (!group) {
      toast.error("Select the group");
      return;
    }
    const data = new FormData();
    if (imageChanged) {
      data.append("image", image);
    }
    data.append("title", title);
    data.append("description", description);
    data.append("payment_method", paymentMethod);
    data.append("group", group);
    data.append("admin", userId);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/announcement/${
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
        setToggleCreateAnnouncement(false);
        
        if (ann_data && redirect) {
          router.push(`/announcements/${title}?ann_id=${ann_data.id}`);
        }
        if (selectGroup) {
          router.push(
            `/groups/${selected_group?.name}?group_id=${selected_group?.group_id}`
          );
        }
        resolve(result);
      } else {
        const result = await response.json();
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
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="relative m-4 w-[90%] sm:w-auto "
    >
      <Card className="w-full max-w-2xl rounded-xl shadow-md shadow-gray-500">
        <button
          onClick={() => {
            setToggleCreateAnnouncement(false);
          }}
          className="flex justify-end absolute right-0 m-2 cursor-pointer "
        >
          <XIcon className="w-8 h-8 bg-white shadow-md shadow-gray-500 rounded-full text-red-500 cursor-pointer" />
        </button>
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
              <div className="md:space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  className="border border-gray-400 focus:border-purple-500"
                />
              </div>
              <div className="md:space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter announcement description"
                  className="border border-gray-400 focus:border-purple-500  sm:h-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {selectGroup && (
                <div className="md:space-y-2">
                  <Label htmlFor="group-name">Select Group</Label>

                  <select
                    name="group_name"
                    id="group_name "
                    className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-500  focus:border-purple-500 rounded-md focus:outline-none text-sm font-medium appearance-none  "
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="">Select group</option>
                    {userJoinedGroup?.map((group) => (
                      <option
                        key={group.group_id}
                        value={group.group_id}
                        className="text-black "
                      >
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="md:space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>

                <select
                  name="payment_method"
                  id="payment_method "
                  className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-500 rounded-md focus:outline-none focus:border-purple-500 text-sm font-menium font-sans appearance-none "
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="khalti" className="py-4 rounded-lg">
                    Khalti
                  </option>
                  <option value="e-sewa">E-Sewa</option>
                  <option value="paypal">Fone-pay</option>
                </select>
              </div>
              <div className="">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  className="focus:border focus:border-purple-400 "
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className={
              "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300  font-bold rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            }
          >
            Post Announcement
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
