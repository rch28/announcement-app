import Link from 'next/link'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='w-full'>

        <nav className='flex justify-between items-center gap-4'>
          <Link href={""} className='bg-white  p-3 text-center  flex-1 rounded-xl shadow-xl'>
            <h1 className='font-medium text-sm'>My Groups</h1>
          </Link>
          <Link href={""} className='bg-white   p-3 text-center  flex-1 rounded-xl shadow-xl'>
            <h1 className='font-medium text-sm'>Joined Groups</h1>
          </Link>
        </nav>
        <div className='flex-1 bg-white h-40 rounded-xl mt-4'>
            {children}
        </div>
    </div>
  )
}

export default layout