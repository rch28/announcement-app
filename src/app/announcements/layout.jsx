import AnnouncementNav from '@/components/announcements/AnnouncementNav'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <AnnouncementNav/>
      {children}
      
      </div>
  )
}

export default layout