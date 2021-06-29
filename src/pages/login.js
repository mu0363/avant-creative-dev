import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { TextField } from "src/components/TextField";
import { loginSchema } from "src/lib/loginSchema";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const id = router.query.id ? router.query.id : null;

  const loginWithGoogle = () => {
    auth.signInWithGoogle(id);
  };
  const loginWithGitHub = () => {
    auth.signInWithGithub(id);
  };
  const loginWithGest = () => {
    setLoading(true);
    const data = {
      email: "gest@example.com",
      password: "123456Ab",
    };
    auth.signInWithEmail(data);
  };

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    auth.signInWithEmail(data);
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex-1 max-w-md">
        <div className="bg-white rounded-md py-5 shadow-lg px-6 mx-5">
          <div>
            <h3 className="text-2xl font-semibold text-center mb-5 cursor-pointer" onClick={() => router.push("/")}>
              Log in to your account
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-center">↓ ゲスト用から簡単にログイン出来ます！</p>
              <LoginButton
                src=""
                authMethod={loginWithGest}
                isLoading={isLoading}
                bgColor="bg-gray-100"
                spinColor="text-gray-500"
                hoverColor="bg-gray-200"
              >
                ゲストログイン
              </LoginButton>
              <LoginButton
                src="/google.svg"
                authMethod={loginWithGoogle}
                bgColor="bg-gray-100"
                hoverColor="bg-gray-200"
              >
                Log in with Google
              </LoginButton>
              <LoginButton
                src="/github.svg"
                authMethod={loginWithGitHub}
                bgColor="bg-gray-100"
                hoverColor="bg-gray-200"
              >
                Log in with GitHub
              </LoginButton>
            </div>
            <div className="mt-10 flex items-center">
              <hr className="flex-1 ml-3" />
              <span className="mx-5 text-gray-400">or</span>
              <hr className="flex-1 mr-3" />
            </div>
          </div>
          <div className="mt-8">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10">
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
              <div className="mt-6">
                <LoginButton
                  authMethod={loginWithGest}
                  isLoading={isLoading}
                  bgColor="bg-ai"
                  spinColor="text-gray-100"
                  textColor="text-white"
                  hoverColor="bg-ai-light"
                >
                  Log in
                </LoginButton>
              </div>
            </form>

            {/* 下部確認 */}
            <div className="mt-5">
              <span className="text-xs text-gray-500 underline hover:text-ai cursor-pointer">Forget Password?</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span>New to Avant Creative?</span>
              <span className="underline text-ai ml-1 cursor-pointer" onClick={() => router.push("/signup")}>
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const isAuthenticated = context.req.cookies["avant-creative-auth"];

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
