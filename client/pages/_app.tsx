import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";

import { apolloClient } from "../lib/apolloClient";

import "../styles/tailwind.scss";
import "antd/dist/antd.less";

import { Layout } from "../components/Layout";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster position="top-right" containerClassName="mt-14" />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
