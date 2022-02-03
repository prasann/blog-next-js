import talksJson from "../../content/_meta/talks.json";
import TalkListItem from "../components/TalkListItem";
import Talk from "../types/talk";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";
import Meta from "../types/meta";

const talks: Talk[] = talksJson;

const Talks = () => {
    const metaDetails: Meta = {
        title: "Prasanna's - Talks",
        description: "lists of all the talks that i have done so far."
    }
    return <div>
        <MetaHeaders {...metaDetails}/>
        <div className="content-area bg-white rounded-xl">
            {talks.map(talk => <TalkListItem key={talk.title} {...talk}/>)}
        </div>
    </div>
}

export default Talks;
