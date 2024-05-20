import React from 'react'

const LeaveConfirm = ({children, title }) => {
  return (
    <div className="bg-white border-2 border-gray-200 shadow-lg rounded-xl p-6 max-w-sm mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
    <p className="text-gray-600 text-sm mb-6">Are you sure you want leave the group?</p>
    {children}
  </div>
  

  )
}

export default LeaveConfirm