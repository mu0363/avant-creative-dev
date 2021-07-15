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
      token: user.za,
      emailVerified: user.emailVerified,
      // stripeRole: (await getStripeRole()) || "free",
    };
  };

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, emailVerified, ...withOutToken } = user;

      createUser(user.uid, withOutToken);

      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signUpWithEmail = async ({ name, email, password }) => {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      const actionCodeSettings = {
        url: "http://localhost:3000/redirect/email-verified",
        handleCodeInApp: false,
      };
      await result.user.updateProfile({ displayName: name });
      await auth.useDeviceLanguage();
      await auth.currentUser.sendEmailVerification(actionCodeSettings);
      await handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      router.push("/redirect/email-verification");
    }
  };

  const updatePhotoURL = async (url) => {
    const user = await auth.currentUser;
    await user.updateProfile({ photoURL: url });
    await handleUser(user);
  };

  const checkEmailExists = async ({ email }) => {
    const providers = await auth.fetchSignInMethodsForEmail(email);
    return providers;
  };

  const signInWithEmail = ({ email, password }) => {
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      router.push("/");
    });
  };

  const signInWithGithub = (id) => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      if (id) {
        router.push(`/video/${id}`);
      } else {
        router.push("/");
      }
    });
  };

  const signInWithGoogle = (id) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      handleUser(result.user);
      Cookies.set("avant-creative-auth", true);
      if (id) {
        router.push(`/video/${id}`);
      } else {
        router.push("/");
      }
    });
  };

  const sendResetEmail = ({ email }) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        router.push("/redirect/send-reset-email");
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        Cookies.remove("avant-creative-auth");
        router.push("/auth/login");
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
    signUpWithEmail,
    signInWithEmail,
    signInWithGithub,
    signInWithGoogle,
    sendResetEmail,
    signOut,
    checkEmailExists,
    updatePhotoURL,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
