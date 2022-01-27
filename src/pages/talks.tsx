import talksJson from "../../content/_meta/talks.json";
import TalkListItem from "../components/TalkListItem";
import Talk from "../types/talk";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";

const talks: Talk[] = talksJson;

const Talks = () => {
    return <div>
        <MetaHeaders/>
        <div className="content-area bg-white rounded-xl">
            {talks.map(talk => <TalkListItem key={talk.title} {...talk}/>)}
        </div>
    </div>
}

export default Talks;
