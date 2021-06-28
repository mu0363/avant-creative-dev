import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { TextField } from "src/components/TextField";

export default function SignUp() {
  const [isEmail, setIsEmail] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const loginWithGitHub = () => {
    auth.signInWithGithub();
  };
  const loginWithGoogle = () => {
    auth.signInWithGoogle();
  };

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("success");
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex-1 max-w-md">
        <div className="bg-white rounded-md py-10 shadow-lg px-6 mx-5">
          <div>
            <h3 className="text-2xl font-semibold pb-5 text-center">Get started</h3>
            {!isEmail ? (
              <div className="space-y-4">
                <LoginButton src="/google.svg" authMethod={loginWithGoogle}>
                  Sign up with Google
                </LoginButton>
                <LoginButton src="/github.svg" authMethod={loginWithGitHub}>
                  Sign up with GitHub
                </LoginButton>

                <div
                  className="bg-ai text-white text-center mt-4 py-3 px-6 rounded-md hover:bg-ai-light"
                  onClick={() => setIsEmail(true)}
                >
                  <button>Sign up with email</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mt-8">
                  <div>
                    <TextField
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Email"
                      name="email"
                      placeholder="you@example.com"
                      type="text"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Password"
                      name="password"
                      placeholder="･･････････"
                      type="password"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Confirm password"
                      name="confirmPassword"
                      placeholder="･･････････"
                      type="password"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="bg-ai text-white text-center mt-4 py-3 px-6 rounded-md hover:bg-ai-light">
                    <button>Sign up</button>
                  </div>
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
