import router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function ConfirmComplete() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div>
      <h1>ありがとう！</h1>
      <p>出来上がるまでちょっと待ってね</p>
    </div>
  );
}
