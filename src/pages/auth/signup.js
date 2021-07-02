import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "src/lib/auth";
import { LoadingButton } from "src/components/LoadingButton";
import { TextField } from "src/components/TextField";
import { signupSchema } from "src/lib/signupSchema";

export default function SignUp() {
  const [isEmail, setIsEmail] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
  };

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const providers = await auth.checkEmailExists(data);
    if (providers.length === 0) {
      auth.signUpWithEmail(data);
    } else {
      toast.error("登録済みのアドレスです。", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex-1 max-w-md">
        <div className="bg-white rounded-md py-10 shadow-lg px-6 mx-5">
          <div>
            <h3 className="text-2xl font-semibold pb-5 text-center">Get started</h3>
            {!isEmail ? (
              <div className="space-y-4">
                <LoadingButton
                  src="/google.svg"
                  authMethod={signupWithGoogle}
                  bgColor="bg-gray-100"
                  hoverColor="bg-gray-200"
                >
                  Sign up with Google
                </LoadingButton>
                <LoadingButton
                  src="/github.svg"
                  authMethod={signupWithGitHub}
                  bgColor="bg-gray-100"
                  hoverColor="bg-gray-200"
                >
                  Sign up with GitHub
                </LoadingButton>

                <LoadingButton
                  authMethod={signupWithEmail}
                  bgColor="bg-ai"
                  spinColor="text-gray-100"
                  textColor="text-white"
                  hoverColor="bg-ai-light"
                >
                  Sign up with email
                </LoadingButton>
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
                  <div className="mt-6">
                    <LoadingButton
                      isLoading={isLoading}
                      bgColor="bg-ai"
                      spinColor="text-gray-100"
                      textColor="text-white"
                      hoverColor="bg-ai-light"
                    >
                      Sign up
                    </LoadingButton>
                  </div>
                </div>
              </form>
            )}
            <div className="mt-5 text-xs text-gray-500">
              <span>Already signed up?</span>
              <span className="underline text-ai ml-1 cursor-pointer" onClick={() => router.push("/auth/login")}>
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
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
