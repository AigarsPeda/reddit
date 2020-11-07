import React from "react";

// ui
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../theme";

// urql
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";

//
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from "../generated/graphql";

// components
import Header from "../components/Header";
import Head from "next/head";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:8000/graphql",
  // for cache
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },

          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user
                  };
                }
              }
            );
          }
        }
      }
    }),
    fetchExchange
  ],
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
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
