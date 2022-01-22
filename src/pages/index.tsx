import Post from "../types/post";
import ContentArea from "../components/landing/ContentArea";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";

type Props = {
    allPosts: Post[]
}

const Home = () => {
    return <div>
        <MetaHeaders/>
        <ContentArea/>
    </div>
}

export default Home;
