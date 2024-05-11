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
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export function AnnouncementCardForm({
  group_id,
  selectGroup,
  userJoinedGroup,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("khalti");
  const [group, setGroup] = useState("");
  const setToggleCreateAnnouncement = useStore(
    (state) => state.setToggleCreateAnnouncement
  );

  const access_token = Cookies.get("access_token");
  const userData = useStore((state) => state.userData);
  const userId = userData?.id;
  const handleFileChange = async (e) => {
    if (!e.target.files[0].type.startsWith("image/")) {
      return;
    }
    setImage(e.target.files[0]);
  };

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
    data.append("image", image);
    data.append("title", title);
    data.append("description", description);
    data.append("payment_method", paymentMethod);
    if (!group_id && selectGroup) {
      data.append("group", group);
    }else{
      data.append("group", group_id);

    }
    data.append("admin", userId);
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/announcement/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setToggleCreateAnnouncement(false);
        resolve(result);
      } else {
        const result = await response.json();
        reject(result);
      }
    });
    toast.promise(newPromise, {
      loading: "Creating Announcement...",
      success: (data) => {
        return `Announcement created successfully`;
      },
      error: (err) => {
        return err?.errors[0].detail;
      },
    });
  };
  return (
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
      <Card className="w-full max-w-2xl rounded-xl">
        <CardHeader>
          <h1 className="flex justify-end ">
            <XIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => setToggleCreateAnnouncement(false)}
            />
          </h1>
          <CardTitle>New Announcement</CardTitle>
          <CardDescription>
            Create a new announcement for this group.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col md:grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  className=""
                />
              </div>
              {selectGroup && (
                <div>
                  <Label htmlFor="payment-method">Select Group</Label>

                  <select
                    name="group_name"
                    id="group_name "
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none text-sm font-semibold font-sans appearance-none"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="">Select group</option>
                    {userJoinedGroup.map((group) => (
                      <option key={group.group_id} value={group.group_id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter announcement description"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>

              <select
                name="payment_method"
                id="payment_method "
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none text-sm font-semibold font-sans appearance-none"
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className={
              "px-6 py-2 bg-purple-600 rounded-full  text-white font-bold hover:bg-purple-700 text-lg md:text-sm   lg:text-lg"
            }
          >
            Post Announcement
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
