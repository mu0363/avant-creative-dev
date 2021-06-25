import { useRouter } from "next/router";
import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { auth, firebase } from "src/lib/firebase";
import { createUser } from "src/lib/db";

const authContext = createContext();

const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // const getStripeRole = async () => {
  //   await auth().currentUser.getIdToken(true);
  //   const decodedToken = await auth().currentUser.getIdTokenResult();
  //   console.log(decodedToken.claims.stripeRole);
  //   return decodedToken.claims.stripeRole;
  // };

  const formatUser = async (user) => {
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      provider: user.providerData[0].providerId,
      photoURL: user.photoURL,
      token: user.ya,
      // stripeRole: (await getStripeRole()) || "free",
    };
  };

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...withOutToken } = user;

      createUser(user.uid, withOutToken);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signInWithEmail = (email, password) => {
    auth.signInWithEmail(email, password).then((result) => {
      handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      router.push("/");
    });
  };

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithRedirect(provider).then((result) => {
      handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      router.push("/");
    });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider).then((result) => {
      handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      router.push("/");
    });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        Cookies.remove("avant-creative-auth");
        router.push("/");
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithEmail,
    signInWithGithub,
    signInWithGoogle,
    signOut,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
