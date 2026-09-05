import Document, { Html, Head, Main, NextScript } from "next/document";

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
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme') || 'prasanna';
                    document.documentElement.setAttribute('data-theme', theme);
                  } catch (e) {}
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
