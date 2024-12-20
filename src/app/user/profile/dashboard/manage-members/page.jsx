"use client";

import GroupMember from "@/components/profile/dashboard/GroupMember";
import { Label } from "@/components/ui/label";
import { fetchAllData, fetchGroup } from "../../../../../index";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { GetAccessToken } from "@/index";

const ManageMembers = () => {
  const searchParams = useSearchParams();
  const [groupId, setGroupId] = useState("");
  const [usersGroup, setUsersGroup] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState("");

  const gid = searchParams.get("group_id");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const allGroups = await fetchAllData(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/joined-by/user/`
        );
        setUsersGroup(allGroups || []);
        setGroupId(gid || (allGroups[0]?.group_id || ""));
      } catch (error) {
        console.error("Error fetching user groups:", error);
        setError("Failed to fetch user groups.");
      }
    };
    fetchGroups();
  }, [gid]);

  useEffect(() => {
    if (groupId) {
      const fetchGroupDetails = async () => {
        try {
          const groupInfo = await fetchGroup(groupId);
          setAdminId(groupInfo.admin_id || "");
          console.log(groupInfo);
          
          // setGroupMembers(groupInfo.members || []);

          // Alternatively, fetch detailed member data
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/${groupId}/list/member/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${GetAccessToken()}`,
              },
            }
          );
          // if (!response.ok) return
          const memberResponse = await response.json();
          setGroupMembers(memberResponse.results || []);
        } catch (error) {
          console.error("Error fetching group details:", error);
          setError("Failed to fetch group details.");
        }
      };
      fetchGroupDetails();
    }
  }, [groupId]);


  const handleRoleChange = async (memberId, newRole) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/group/member/${memberId}/role/change/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GetAccessToken()}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      setGroupMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === memberId ? { ...member, role: newRole } : member
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await fetch(`/api/v1/group/member/${memberId}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${GetAccessToken()}`,
        },
      });
      // setGroupMembers((prev) => prev.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  return (
    <div className="min-h-[26rem]">
      {error && <p className="text-red-500">{error}</p>}
      <div className="md:space-y-2">
        <Label htmlFor="payment-method">Select Group</Label>
        <select
          name="group_name"
          id="group_name"
          className="block w-full p-3 text-gray-700 bg-white border border-gray-500 focus:border-purple-500 rounded-md focus:outline-none text-sm font-semibold"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value="">Select group</option>
          {usersGroup.map((group) => (
            <option key={group.group_id} value={group.group_id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4">
        {Array.isArray(groupMembers) && groupMembers.length === 0 ? (
          <h1 className="text-sm font-medium">No members in this group</h1>
        ) : (
          <div>
            <h1 className="text-sm font-medium">Group Members</h1>
            {groupMembers.map((member) => (
              <GroupMember
                key={member.id}
                member={member}
                admin_id={adminId}
                onRoleChange={handleRoleChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ManageMemberpage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageMembers />
    </Suspense>
  );
};

export default ManageMemberpage;
