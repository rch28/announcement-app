import React from 'react'

const DeleteConfirm = ({children, title }) => {
  return (
    <div className="bg-white border-2 border-gray-300 shadow-md shadow-purple-200 p-4 rounded-lg w-88">
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500 text-sm">
        Are you sure you want to delete?
      </p>
        {children}
    </div>
  </div>

  )
}

export default DeleteConfirm