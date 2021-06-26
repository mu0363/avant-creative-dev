import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { InputText } from "src/components/InputText";
import { useRequiredLogin } from "src/lib/useRequiredLogin";

export default function Login() {
  const auth = useAuth();

  const loginWithGoogle = () => {
    auth.signInWithGoogle();
  };
  const loginWithGitHub = () => {
    auth.signInWithGithub();
  };

  useRequiredLogin();

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
        <div className="bg-white rounded-md py-5 shadow-lg px-6 mx-5">
          <div className="divide-y divide-gray-200">
            <div>
              <Link href="/">
                <a>
                  <h3 className="text-2xl font-semibold text-center mb-5">Log in to your account</h3>
                </a>
              </Link>
              <div className="space-y-4">
                <LoginButton src="/google.svg" authMethod={loginWithGoogle}>
                  Log in with Google
                </LoginButton>
                <LoginButton src="/github.svg" authMethod={loginWithGitHub}>
                  Log in with GitHub
                </LoginButton>
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
                <div className="bg-ai text-white text-center mt-6 py-3 px-6 rounded-md hover:bg-ai-light cursor-pointer">
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
