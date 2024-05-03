import Link from 'next/link'
import React from 'react'

const Features = () => {
  return (
    <div className='min-h-96 mt-10'>
            <ul className='bg-gray-300 p-4 flex flex-col gap-4'>
                <Link href={'/features/group-mail'} className=' bg-white p-3 rounded-md text-xl font-bold cursor-pointer hover:bg-yellow-100'>
                    <span>Group Mail</span>
                </Link>
                <Link href='/features/new-announcement' className=' bg-white p-3 rounded-md text-xl font-bold cursor-pointer hover:bg-yellow-100 flex gap-4 items-center'>
                    <span >New Announcement  </span>
                   
                </Link>
               
            </ul>
    </div>
  )
}

export default Features