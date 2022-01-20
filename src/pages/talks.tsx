import talksJson from "../../content/_meta/talks.json";
import TalkListItem from "../components/TalkListItem";
import Talk from "../types/talk";

const talks: Talk[] = talksJson;

const Talks = () => {
    return <div>
        <div className="prose max-w-none content-area bg-white rounded-xl">
            {talks.map(talk => <TalkListItem key={talk.title} {...talk}/>)}
        </div>
    </div>
}

export default Talks;
