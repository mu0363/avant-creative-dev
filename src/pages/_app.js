import React from "react";
import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";
import store from "src/features/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextNprogress color="#e47f5a" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
