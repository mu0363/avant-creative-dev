import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useRequiredLogin = () => {
  const router = useRouter();
  const isSignedIn = Cookies.get("avant-creative-auth");

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, []);
};
