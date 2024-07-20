"use client";

import GroupMember from "@/components/profile/dashboard/GroupMember";
import { Label } from "@/components/ui/label";
import { fetchAllData, fetchGroup } from "../../../../../index";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ManageMembers = () => {
  const searchParams = useSearchParams();
  const [groupId, setGroupId] = useState("");
  const [usersGroup, setUsersGroup] = useState(null);
  const [groupMember, setGroupMember] = useState(null);
  const [admin_id, setAdmin_id] = useState("");

  const gid = searchParams.get("group_id");

  useEffect(() => {
    const fetchGroup = async () => {
      const allData = await fetchAllData(
        `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/joined-by/user/`
      );
      setUsersGroup(allData);
      if (gid) {
        setGroupId(gid);
      } else {
        setGroupId(allData[0].group_id);
      }
    };
    fetchGroup();
  }, [gid]);
  useEffect(() => {
    if (groupId) {
      const GroupData = async () => {
        const groupInfo = await fetchGroup(groupId);
        if (groupInfo.total_members === 0) return;
        setAdmin_id(groupInfo.admin_id);
        setGroupMember(groupInfo.members);
      };
      GroupData();
    }
  }, [groupId, usersGroup]);
  return (
    <div className="min-h-[26rem]">
      <div className="md:space-y-2">
        <Label htmlFor="payment-method">Select Group</Label>

        <select
          name="group_name"
          id="group_name "
          className="block w-full p-3 text-gray-700  bg-white border border-gray-500  focus:border-purple-500 rounded-md focus:outline-none text-sm font-semibold appearance-auto "
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value="">Select group</option>
          {usersGroup?.map((group) => (
            <option
              key={group.group_id}
              value={group.group_id}
              className="text-blcak "
            >
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4">
        {!groupMember && (
          <h1 className="text-sm font-medium">No members in this group</h1>
        )}
        {groupMember && (
          <div>
            <h1 className="text-sm font-medium">Groups Members</h1>
            {groupMember.map((member) => (
              <GroupMember key={member} id={member} admin_id={admin_id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;
