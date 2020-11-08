import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import Head from "next/head";
import React from "react";
// components
import Header from "../components/Header";
import theme from "../theme";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
