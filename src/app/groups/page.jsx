"use client"
import CategoryList from '@/components/group/CategoryList'
import CreateGroup from '@/components/group/CreateGroup'
import GroupList from '@/components/group/GroupList'
import { useStore } from '@/stores/store'
import React from 'react'

const GroupsPage = () => {
  const toggleCreateGroup = useStore((state) => state.toggleCreateGroup);
  return (
    <div>
      <CategoryList/>
      {/* Group list */}
      <GroupList/>
      {toggleCreateGroup && (
        <div className={` fixed top-0 left-0 flex w-screen h-screen justify-center items-center ${toggleCreateGroup && "bg-black/30 "}`}>
          <CreateGroup />
        </div>
      )}
    
    </div>
  )
}

export default GroupsPage