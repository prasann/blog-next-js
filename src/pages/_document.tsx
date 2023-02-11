import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/googleTag";

const GoogleAnalytics = () => {
  const isProduction = true;
  if (isProduction) {
    return (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </>
    );
  }
  return <></>;
};
export default class MyDocument extends Document {
  //TODO: Remove this, and make typography work without cdn
  render() {
    return (
      <Html lang={"en-us"}>
        <Head>
          <link
            rel="apple-touch-icon"
            href="/assets/favicons/apple-icon-180x180.png"
            sizes="180x180"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicons/favicon-32x32.png"
          />

          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,600;1,400;1,600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/@tailwindcss/typography@0.4.x/dist/typography.min.css"
          />
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
