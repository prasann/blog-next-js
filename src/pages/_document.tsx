import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    //TODO: Remove this, and make typography work without cdn
    render() {
        return (
            <Html>
                <Head>
                    <link rel="apple-touch-icon" href="/assets/favicons/apple-icon-180x180.png" sizes="180x180" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,600;1,400;1,600&display=swap"
                        rel="stylesheet"/>
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
