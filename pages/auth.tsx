import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Logo from "@/public/images/logo.png";
import Input from "@/components/Input";

const Auth: FC = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        await axios.post("/api/register", {
          email,
          name: username,
          password,
        });

        login(email, password);
      } catch (error) {
        console.log(error);
      }
    },
    [login]
  );

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
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>

            <Formik
              initialValues={{
                email: "",
                password: "",
                username: "",
              }}
              // validationSchema={Yup.object({
              //   email: Yup.string()
              //     .email("Invalid email address")
              //     .required("Required"),
              //   password: Yup.string().required("Required"),
              //   username:
              //     variant === "register"
              //       ? Yup.string().required("Required")
              //       : Yup.string(),
              // })}
              onSubmit={(values) => {
                if (variant === "login") {
                  login(values.email, values.password);
                } else {
                  register(values.username, values.email, values.password);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="flex flex-col gap-4">
                    {variant === "register" && (
                      <Input
                        label="Username"
                        onChange={handleChange}
                        id="username"
                        type="text"
                        value={values.username}
                      />
                    )}
                    {errors.username && touched.username && errors.username}

                    <Input
                      label="Email"
                      onChange={handleChange}
                      id="email"
                      type="email"
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <Input
                      label="Password"
                      onChange={handleChange}
                      id="password"
                      type="password"
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                  </div>
                  <button
                    className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting
                      ? "Loading..."
                      : variant === "login"
                      ? "Login"
                      : "Sign up"}
                  </button>
                  <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                    <div
                      onClick={() =>
                        signIn("google", { callbackUrl: "/profiles" })
                      }
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                    >
                      <FcGoogle size={32} />
                    </div>
                    <div
                      onClick={() =>
                        signIn("github", { callbackUrl: "/profiles" })
                      }
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                    >
                      <FaGithub size={32} />
                    </div>
                  </div>
                  <p className="text-neutral-500 mt-12">
                    {variant === "login"
                      ? "Don't have an account?"
                      : "Have an account?"}
                    <span
                      onClick={toggleVariant}
                      className="text-white ml-1 hover:underline cursor-pointer"
                    >
                      {variant === "login" ? "Register" : "Login"}
                    </span>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Auth;
