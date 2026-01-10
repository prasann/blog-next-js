import "../styles/globals.css";
import "../styles/loader.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Router from "next/router";
import NProgress from "nprogress";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { pageView } from "../lib/googleTag";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", (url) => {
  NProgress.done();
  pageView(url);
});
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
