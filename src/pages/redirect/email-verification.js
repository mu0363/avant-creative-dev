import Image from "next/image";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "src/features/loading/loadingSlice";

export default function EmailVerification() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
    // setTimeout(() => {
    //   router.push("/");
    // }, 5000);
  }, []);

  return (
    <div className="flex min-h-screen font-Kiwi">
      <div className="m-auto text-center">
        <Image src="/verify.png" alt="relax" height="300" width="300" />
        <div>
          <h1 className="text-3xl font-medium">確認メールを送信しました</h1>
          <p className="mt-4 font-medium">メールを確認してパスワードをリセットしてください。</p>
          {/* <p
            className="font-medium mt-10 underline cursor-pointer hover:text-ai"
            onClick={() => router.push("/auth/login")}
          >
            ← ログインページへ戻る
          </p> */}
        </div>
      </div>
    </div>
  );
}
