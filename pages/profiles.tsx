import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import defaultBlue from "@/public/images/default-blue.png";
import defaultRed from "@/public/images/default-red.png";
import defaultSlate from "@/public/images/default-slate.png";
import defaultGreen from "@/public/images/default-green.png";

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";

const images = [defaultBlue, defaultRed, defaultSlate, defaultGreen];

interface UserCardProps {
  name: string;
}

const UserCard: FC<UserCardProps> = ({ name }) => {
  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <Image
          draggable={false}
          src={defaultBlue}
          alt=""
          className="w-max h-max object-contain"
          priority={true}
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

const App = () => {
  const router = useRouter();
  const { data } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={data?.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
