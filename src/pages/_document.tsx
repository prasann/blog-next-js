import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    //TODO: Remove this, and make typography work without cdn
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/@tailwindcss/typography@0.4.x/dist/typography.min.css"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}
