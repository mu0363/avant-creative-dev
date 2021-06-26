import Link from "next/link";
import { useAuth } from "src/lib/auth";
import { LoginButton } from "src/components/LoginButton";
import { InputText } from "src/components/InputText";
import { useRequiredLogin } from "src/lib/useRequiredLogin";

export default function SignUp() {
  const auth = useAuth();

  useRequiredLogin();

  const loginWithGitHub = () => {
    auth.signInWithGithub();
  };
  const loginWithGoogle = () => {
    auth.signInWithGoogle();
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex-1 max-w-md">
        <div className="bg-white rounded-md py-10 shadow-lg px-6 mx-5">
          <div>
            <h3 className="text-2xl font-semibold pb-5 text-center">Get started with Avant</h3>
            <div className="space-y-4">
              <LoginButton src="/google.svg" authMethod={loginWithGoogle}>
                Sign up with Google
              </LoginButton>
              <LoginButton src="/github.svg" authMethod={loginWithGitHub}>
                Sign up with GitHub
              </LoginButton>

              <div className="bg-ai text-white text-center mt-4 py-3 px-6 rounded-md hover:bg-ai-light">
                <button>Sign up with email</button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <span>Already signed up?</span>
                <Link href="/login">
                  <a>
                    <span className="underline text-ai ml-1">Login</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   <div className="mt-8">
    //   <div className="mt-10">
    //     <InputText name="email" placeholder="you@example.com" />
    //   </div>
    //   <div className="mt-4">
    //     <InputText name="password" placeholder="･･････････" />
    //   </div>
    //   <div className="bg-ai text-white text-center mt-4 py-3 px-6 rounded-md hover:bg-ai-light">
    //     <button>Log in</button>
    //   </div>
    //   <div className="mt-5">
    //     <span className="text-xs text-gray-500 underline hover:text-ai cursor-pointer">Forget Password?</span>
    //   </div>
    //   <div className="mt-2 text-xs text-gray-500">
    //     <span>New to Avant Creative?</span>
    //     <Link href="/signup">
    //       <a>
    //         <span className="underline text-ai ml-1">Sign up</span>
    //       </a>
    //     </Link>
    //   </div>
    // </div>
  );
}
