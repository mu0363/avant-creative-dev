import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { InputText } from "src/components/InputText";

export default function Login() {
  const auth = useAuth();
  const router = useRouter();
  const id = router.query.id ? router.query.id : null;

  const loginWithGoogle = () => {
    auth.signInWithGoogle(id);
  };
  const loginWithGitHub = () => {
    auth.signInWithGithub();
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
        <div className="bg-white rounded-md py-5 shadow-lg px-6 mx-5">
          <div>
            <h3 className="text-2xl font-semibold text-center mb-5 cursor-pointer" onClick={() => router.push("/")}>
              Log in to your account
            </h3>
            <div className="space-y-4">
              <LoginButton src="/google.svg" authMethod={loginWithGoogle}>
                Log in with Google
              </LoginButton>
              <LoginButton src="/github.svg" authMethod={loginWithGitHub}>
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
                <InputText name="email" placeholder="you@example.com" type="text" register={register} errors={errors} />
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
