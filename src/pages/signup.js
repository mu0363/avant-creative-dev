import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { TextField } from "src/components/TextField";
import { signupSchema } from "src/lib/signupSchema";

export default function SignUp() {
  const [isEmail, setIsEmail] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const signupWithGoogle = () => {
    auth.signInWithGoogle();
  };
  const signupWithGitHub = () => {
    auth.signInWithGithub();
  };
  const signupWithEmail = () => {
    setIsEmail(true);
    //check the email if it exist
  };

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = (data) => {
    auth.signUpWithEmail(data);
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex-1 max-w-md">
        <div className="bg-white rounded-md py-10 shadow-lg px-6 mx-5">
          <div>
            <h3 className="text-2xl font-semibold pb-5 text-center">Get started</h3>
            {!isEmail ? (
              <div className="space-y-4">
                <LoginButton
                  src="/google.svg"
                  authMethod={signupWithGoogle}
                  bgColor="bg-gray-100"
                  hoverColor="bg-gray-200"
                >
                  Sign up with Google
                </LoginButton>
                <LoginButton
                  src="/github.svg"
                  authMethod={signupWithGitHub}
                  bgColor="bg-gray-100"
                  hoverColor="bg-gray-200"
                >
                  Sign up with GitHub
                </LoginButton>

                <LoginButton
                  authMethod={signupWithEmail}
                  bgColor="bg-ai"
                  spinColor="text-gray-100"
                  textColor="text-white"
                  hoverColor="bg-ai-light"
                >
                  Sign up with email
                </LoginButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mt-8">
                  <div>
                    <TextField
                      label="Name"
                      name="name"
                      placeholder="John"
                      type="text"
                      registers={register("name")}
                      errorMessage={errors.name?.message}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Email"
                      name="email"
                      placeholder="you@example.com"
                      type="text"
                      registers={register("email")}
                      errorMessage={errors.email?.message}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Password"
                      name="password"
                      placeholder="･･････････"
                      type="password"
                      registers={register("password")}
                      errorMessage={errors.password?.message}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Confirm password"
                      name="confirmPassword"
                      placeholder="･･････････"
                      type="password"
                      registers={register("confirmPassword")}
                      errorMessage={errors.confirmPassword?.message}
                    />
                  </div>

                  <button className="bg-ai text-white text-center mt-4 py-3 px-6 rounded-md hover:bg-ai-light w-full">
                    Sign up
                  </button>
                </div>
              </form>
            )}
            <div className="mt-5 text-xs text-gray-500">
              <span>Already signed up?</span>
              <span className="underline text-ai ml-1 cursor-pointer" onClick={() => router.push("/login")}>
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const isAuthenticated = context.req.cookies.auth;

  if (isAuthenticated) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: {} };
};
