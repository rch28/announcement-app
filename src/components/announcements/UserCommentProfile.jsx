import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const UserCommentProfile = ({userData, replyMode}) => {
  return (
    <>
     {userData?.profilepic && (
        <Avatar className={` shadow-md shadow-gray-500 p-0.5 ${replyMode ? "h-6 w-6":"h-10 w-10"} `}>
          <AvatarImage
            alt="@shadcn"
            src={userData?.profilepic}
            className="rounded-full"
          />
          <AvatarFallback>
            {userData?.first_name[0]}
            {userData?.last_name[0]}
          </AvatarFallback>
        </Avatar>
      )}
      {!userData?.profilepic && (
        <Avatar className={` shadow-md shadow-gray-500 p-0.5 ${replyMode ? "h-6 w-6":"h-10 w-10"} `}>
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>YS</AvatarFallback>
        </Avatar>
      )}
    </>
  )
}

export default UserCommentProfile