import React from 'react'

const DeleteConfirm = ({children, title }) => {
  return (
    <div className="bg-white border-2 border-gray-200 shadow-lg rounded-lg p-6 max-w-sm mx-auto">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
    <p className="text-gray-600 text-sm mb-6">Are you sure you want to delete?</p>
    {children}
  </div>
  

  )
}

export default DeleteConfirm