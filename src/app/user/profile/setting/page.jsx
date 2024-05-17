import EditProfile from '@/components/profile/EditProfile'
import EditProfileImg from '@/components/profile/EditProfileImg'
import React from 'react'

const Setting = () => {
  return (
    <div className='p-8 pt-4 w-full bg-white rounded-xl shadow-xl shadow-gray-500'>
      <h1 className='border-b border-gray-400 py-2 w-full text-xl tracking-tighter font-medium text-black/80 '>Manage Profile</h1>

      <div className="flex gap-4 md:gap-2 mt-4">
        <div className='flex-1 md:pr-16'>
          <EditProfile/>
        </div>
        <div className='flex-[0.3]'>
          <EditProfileImg/>
        </div>
      </div>
    </div>
  )
}

export default Setting