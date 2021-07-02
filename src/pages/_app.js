import React from "react";
import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";
import store from "src/features/store";
import { Provider } from "react-redux";
import { AuthProvider } from "src/lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NextNprogress color="#e47f5a" options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
