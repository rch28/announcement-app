"use client"
import dynamic from 'next/dynamic';

const CreateGroup = dynamic(() => import('@/components/group/CreateGroup'), { ssr: false });
import CategoryList from '@/components/group/CategoryList'
import GroupList from '@/components/group/GroupList'
import PopUpWrapper from '@/components/PopUpWrapper'
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
        <PopUpWrapper>
          <CreateGroup/>
        </PopUpWrapper>
      )}
    
    </div>
  )
}

export default GroupsPage