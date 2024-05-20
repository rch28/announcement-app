import React from 'react'

const PopUpWrapper = ({children}) => {
  return (
    <div className='fixed top-0 left-0 z-50 flex w-screen h-screen justify-center items-center backdrop-blur-sm bg-black/50'>{children}</div>
  )
}

export default PopUpWrapper