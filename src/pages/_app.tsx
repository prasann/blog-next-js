import '../styles/globals.css'
import '../styles/post.css'
import "../styles/prism/themes/prism-atom-dark.css";

import type { AppProps  } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
