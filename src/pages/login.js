import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { InputText } from "src/components/InputText";

export default function Login() {
  const auth = useAuth();
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
      <div className="m-auto">
        <div className="bg-white rounded-md p-10 shadow-lg">
          <div className="divide-y divide-gray-200">
            <div>
              <Link href="/">
                <a>
                  <img src="avant_creative_orange_logo.svg" alt="avant-logo" className="mb-10" />
                </a>
              </Link>
              <h3 className="text-2xl font-semibold pb-5">Log in to your account</h3>
              <div className="space-y-4">
                <LoginButton src="/google.svg" authMethod={loginWithGoogle}>
                  Log in with Google
                </LoginButton>
                <LoginButton src="/github.svg" authMethod={loginWithGitHub}>
                  Log in with GitHub
                </LoginButton>

                <p>{auth?.user?.email}</p>
              </div>
            </div>
            <div className="mt-8">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-10">
                  <InputText
                    name="email"
                    placeholder="you@example.com"
                    type="text"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mt-4">
                  <InputText
                    name="password"
                    placeholder="･･････････"
                    type="password"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="bg-ai text-white text-center mt-6 py-3 px-6 rounded-md hover:bg-ai-light">
                  <button>Log in</button>
                </div>
              </form>

              {/* 下部確認 */}
              <div className="mt-5">
                <span className="text-xs text-gray-500 underline hover:text-ai cursor-pointer">Forget Password?</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <span>New to Avant Creative?</span>
                <Link href="/signup">
                  <a>
                    <span className="underline text-ai ml-1">Sign up</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
