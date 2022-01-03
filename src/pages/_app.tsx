import '../styles/globals.css'
import '../styles/landing.css'
import '../styles/loader.css'
import "../styles/prism/themes/prism-atom-dark.css";

import Router from 'next/router';
import NProgress from 'nprogress';

import type { AppProps  } from 'next/app'
import Layout from "../components/layout";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
