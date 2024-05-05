import React from 'react'
import { otpImg } from '../../../../public'
import Image from 'next/image'
import ForgotPassword from '@/components/layout/ForgotPassword'

const ForgotPasswordPage = () => {
  return (
    <div className="p-4 mt-4 transition-all ease-linear max-w-3xl  mx-auto h-[434px]">
    <div className=" flex justify-between gap-4">
      <div>

        <ForgotPassword/>
      </div>
      <div className="hidden md:flex flex-1">
        <Image src={otpImg} height={300} width={400} priority alt="auth" />
      </div>
    </div>
  </div>
  )
}

export default ForgotPasswordPage