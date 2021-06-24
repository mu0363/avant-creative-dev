import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "src/features/scenes/loadingSlice";

export default function ConfirmComplete() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
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
