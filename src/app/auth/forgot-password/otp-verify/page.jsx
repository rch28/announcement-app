import Image from "next/image";
import React from "react";
import { otpImg } from "../../../../../public";
import VerifyOtpForm from "@/components/layout/VerifyOtpForm";

const VerifyOtp = () => {
  return (
    <div className="p-4 mt-4 transition-all ease-linear max-w-3xl  mx-auto h-[434px]">
      <div className=" flex justify-between gap-4">
        <div>
          <VerifyOtpForm />
        </div>
        <div className="hidden md:flex flex-1">
          <Image src={otpImg} height={300} width={400} priority alt="auth" />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
