import Image from "next/image";
import React from "react";
import { auth } from "../../../../public";
import ResetPasswordFrom from "@/components/layout/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="p-4 mt-4">
      <div className=" flex justify-center md:justify-between flex-row-reverse gap-4">
        <div>
          <ResetPasswordFrom />
        </div>
        <div className=" hidden md:flex flex-1 justify-center">
          <Image src={auth} height={400} width={400} priority alt="auth" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
