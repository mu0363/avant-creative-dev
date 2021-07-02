import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "src/lib/auth";
import { LoadingButton } from "src/components/LoadingButton";
import { TextField } from "src/components/TextField";
import { resetEmailSchema } from "src/lib/resetEmailSchema";

//実装する
//https://blog.ojisan.io/firebase-auth-ipass-login

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const id = router.query.id ? router.query.id : null;

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetEmailSchema) });

  const onSubmit = (data) => {
    setLoading(true);
    auth.sendResetEmail(data);
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex-1 max-w-md">
        <div className="bg-white rounded-md py-5 shadow-lg px-6 mx-5">
          <h3 className="text-2xl font-semibold">パスワードを忘れた場合</h3>
          <p className="text-xs mt-2 mb-10 font-Kosugi">安心してください。リセットできますよ。</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <TextField
                label=""
                name="email"
                placeholder="メールアドレス"
                type="text"
                registers={register("email")}
                errorMessage={errors.email?.message}
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
                リセットメールを送信
              </LoadingButton>
            </div>
          </form>
          <div className="mt-5" onClick={() => router.push("/auth/login")}>
            <span className="text-xs text-gray-500 underline hover:text-ai cursor-pointer">← Back to login</span>
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
