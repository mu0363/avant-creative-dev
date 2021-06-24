import Image from "next/image";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "src/features/loading/loadingSlice";

export default function ConfirmComplete() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="m-auto text-center">
        <Image src="/undraw_chilling_8tii.svg" alt="relax" height="300" width="400" />
        <div className="mt-10">
          <h1 className="text-3xl">Thank you!!</h1>
          <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p> Quia laudantium obcaecati non, quidem alias</p>
        </div>
      </div>
    </div>
  );
}
