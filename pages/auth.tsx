import Image from "next/image";
import { FC } from "react";
import Logo from "@/public/images/logo.png";
import Input from "@/components/Input";

const auth: FC = () => {
  return (
    <div
      className={`relative h-full w-ful bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover`}
    >
      <div className="bg-black w-full h-full sm:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image alt="logo" src={Logo} className="h-12 object-contain" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 sm:w-2/5 sm:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
            <div className="flex flex-col gap-4">
              <Input label="Email" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth;
