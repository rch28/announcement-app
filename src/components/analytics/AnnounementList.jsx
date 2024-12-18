'use client'
import { Eye, ChartBarIncreasing, } from 'lucide-react';
import { useState } from 'react';
import Link from "next/link";

const AnnouncementList = ()=>{
    const [toggle,setToggle] = useState(false);

    return (
        <div className="shadow-custom-all rounded-xl">
            {/* <div>
                <h1 className="text-xl font-bold text-center">Announcements</h1>
            </div> */}
            <div className='w-full pb-6 px-10'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b-2 border-gray-300'>
                            <td className='py-4 font-bold'>Announcement Title</td>
                            <td className='py-4 font-bold'>Likes/Dislike</td>
                            <td className='py-4 font-bold'>Comments</td>
                            <td className='py-4 font-bold'>Action</td>
                        </tr>
                    </thead>
                    <tbody className='py-4'>
                        <tr className='border-b-2 border-gray-300'>
                            <td className='py-4'>Announcement 1</td>
                            <td className='py-4'>10/3</td>
                            <td className='py-4'>5</td>
                            <td className='py-4'>
                                <div className="flex gap-x-4 w-fit">
                                    <div title="View" className="relative">
                                        <Link href={`#`}>
                                            <Eye />
                                        </Link>
                                    </div>
                                    <div title="Analytics" className="relative">
                                        <Link href='/analytics/announcement'>
                                            <ChartBarIncreasing />
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b-2 border-gray-300'>
                            <td className='py-4'>Announcement 2</td>
                            <td className='py-4'>10/3</td>
                            <td className='py-4'>5</td>
                            <td className='py-4'>
                                <div className="flex gap-x-4 w-fit">
                                    <div title="View" className="relative">
                                        <Link href={`#`}>
                                            <Eye />
                                        </Link>
                                    </div>
                                    <div title="Analytics" className="relative">
                                        <Link href='/analytics/announcement'>
                                            <ChartBarIncreasing />
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b-2 border-gray-300'>
                            <td className='py-4'>Announcement 3</td>
                            <td className='py-4'>10/3</td>
                            <td className='py-4'>5</td>
                            <td className='py-4'>
                                <div className="flex gap-x-4 w-fit">
                                    <div title="View" className="relative">
                                        <Link href={`#`}>
                                            <Eye />
                                        </Link>
                                    </div>
                                    <div title="Analytics" className="relative">
                                        <Link href='/analytics/announcement'>
                                            <ChartBarIncreasing />
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b-2 border-gray-300'>
                            <td className='py-4'>Announcement 4</td>
                            <td className='py-4'>10/3</td>
                            <td className='py-4'>5</td>
                            <td className='py-4'>
                                <div className="flex gap-x-4 w-fit">
                                    <div title="View" className="relative">
                                        <Link href={`#`}>
                                            <Eye />
                                        </Link>
                                    </div>
                                    <div title="Analytics" className="relative">
                                        <Link href='/analytics/announcement'>
                                            <ChartBarIncreasing />
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b-2 border-gray-300'>
                            <td className='py-4'>Announcement 5</td>
                            <td className='py-4'>10/3</td>
                            <td className='py-4'>5</td>
                            <td className='py-4'>
                                <div className="flex gap-x-4 w-fit">
                                    <div title="View" className="relative">
                                        <Link href={`#`}>
                                            <Eye />
                                        </Link>
                                    </div>
                                    <div title="Analytics" className="relative">
                                        <Link href='/analytics/announcement'>
                                            <ChartBarIncreasing />
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default AnnouncementList