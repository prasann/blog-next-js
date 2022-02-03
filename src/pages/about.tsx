import MetaHeaders from "../components/MetaHeaders";
import React from "react";
import About from "../components/About";
import Meta from "../types/meta";

const AboutPage = () => {
    const metaDetails: Meta = {
        title: "Prasanna Venkatesan",
        description: "I'm a software architect, lives in bengaluru"
    }
    return <div>
        <MetaHeaders {...metaDetails}/>
        <About/>
    </div>
}
export default AboutPage;

