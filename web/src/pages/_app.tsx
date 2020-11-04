import React from "react";

// ui
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../theme";

// urql
import { createClient, Provider } from "urql";

// components
import Header from "../components/Header";

const client = createClient({
  url: "http://localhost:8000/graphql",
  // needed for cookie
  fetchOptions: {
    credentials: "include"
  }
});

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
