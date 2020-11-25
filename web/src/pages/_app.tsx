import React from "react";
import Head from "next/head";
import theme from "../theme";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";

import "../styles/styles.css";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
