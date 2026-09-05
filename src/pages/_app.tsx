import "../styles/globals.css";
import "../styles/loader.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Router from "next/router";
import NProgress from "nprogress";
import Script from "next/script";
import { Mulish } from "next/font/google";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { pageView, GA_TRACKING_ID } from "../lib/googleTag";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-mulish",
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", (url) => {
  NProgress.done();
  pageView(url);
});
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={mulish.variable}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </div>
  );
}

export default MyApp;
