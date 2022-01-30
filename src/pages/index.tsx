import ContentArea from "../components/landing/ContentArea";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";
import {GetStaticProps} from "next";
import generateMainFeeds from "../lib/feed";

const Home = () => {
    return <div>
        <MetaHeaders/>
        <ContentArea/>
    </div>
}

export const getStaticProps: GetStaticProps = async () => {
    await generateMainFeeds();
    return {
        props: {
            dummyVar: [],
        },
    };
};

export default Home;
