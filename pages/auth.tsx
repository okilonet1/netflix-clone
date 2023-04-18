import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Logo from "@/public/images/logo.png";
import Input from "@/components/Input";

const Auth: FC = () => {
  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

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
              initialValues={{ email: "", password: "", username: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
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
                    <Input
                      label="Email"
                      onChange={handleChange}
                      id="email"
                      type="email"
                      value={values.email}
                    />
                    <Input
                      label="Password"
                      onChange={handleChange}
                      id="password"
                      type="password"
                      value={values.password}
                    />
                  </div>
                  <button
                    className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {variant === "login" ? "Login" : "Sign up"}
                  </button>
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

export default Auth;
