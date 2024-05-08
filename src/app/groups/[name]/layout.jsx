import GroupNav from '@/components/group/GroupNav'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <div className='p-4'>
        <GroupNav/>
      </div>
      {children}
      
      </div>
  )
}

export default layout