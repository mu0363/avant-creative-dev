import Image from "next/image";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "src/features/loading/loadingSlice";

export default function ConfirmComplete() {
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
        <Image src="/thanks.png" alt="relax" height="300" width="300" />
        <div>
          <h1 className="text-3xl font-medium">送信完了!!</h1>
          <p className="mt-4 font-medium">書き出しが終わったらメールにお知らせします。</p>
          <p className="font-medium">しばらくお待ちください。</p>
          <p className="font-medium mt-10 underline cursor-pointer hover:text-ai" onClick={() => router.push("/")}>
            ← トップページへ戻る
          </p>
        </div>
      </div>
    </div>
  );
}
