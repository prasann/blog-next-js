import Head from "next/head";
import Meta, { defaultMeta } from "../types/meta";

const MetaHeaders = (customMetaHeader: Meta) => {
  const metaHeader = Object.assign({}, defaultMeta, customMetaHeader);
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{metaHeader.title}</title>
      <meta name="description" content={metaHeader.description} />
      <meta name="robots" content="index, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/*  OG Meta Tags  */}
      <meta property="og:title" content={metaHeader.title} />
      <meta property="og:description" content={metaHeader.description} />
      <meta name="image" property="og:image" content={metaHeader.image} />
      {metaHeader.isArticle && <meta property="og:type" content="article" />}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content="https://prasanna.dev" />
      <meta property="fb:app_id" content="670156599751120%" />
      <meta name="author" content="Prasanna" />
      {/*    Twitter tags*/}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="pvenk" />
      <meta property="twitter:title" content={metaHeader.title} />
      <meta property="twitter:image" content={metaHeader.image} />
    </Head>
  );
};

export default MetaHeaders;
