import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <div>
      <h2 className="text-white">this is {user?.email}</h2>
      <button className="bg-white" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}

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
