import Image from "next/image";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "src/features/loading/loadingSlice";

export default function EmailVerified() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);

  return (
    <div className="flex min-h-screen font-Kiwi">
      <div className="m-auto text-center">
        <Image src="/cat.png" alt="relax" height="300" width="300" />
        <div>
          <h1 className="text-3xl font-medium">メールのご確認ありがとうございます！</h1>
          <p className="mt-4 font-medium">5秒後にトップページへ移動します。</p>
          <p className="font-medium mt-10 underline cursor-pointer hover:text-ai" onClick={() => router.push("/")}>
            ← トップページへ戻る
          </p>
        </div>
      </div>
    </div>
  );
}
