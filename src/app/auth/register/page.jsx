
import Image from "next/image";
import { auth } from "../../../../public";
import RegisterForm from "@/components/layout/RegisterForm";
const Register = () => {

  return (
    <div className="p-4 mt-4 transition-all ease-linear ">
      <div className=" flex justify-between gap-4">
        <RegisterForm/>
        <div className="hidden md:flex flex-1">
          <Image src={auth} height={400} width={400} priority alt="auth" />
        </div>
      </div>
    </div>
  );
};

export default Register;
