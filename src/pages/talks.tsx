import Header from "../components/Header";
import talksJson from "../../content/_talks/content.json";
import TalkListItem from "../components/TalkListItem";
import Talk from "../types/talk";

const talks: Talk[] = talksJson;

const Talks = () => {
    return <div className="prose max-w-none">
        <Header/>
        <div className="prose max-w-none content-area bg-white rounded-xl">
            {talks.map(talk => <TalkListItem {...talk}/>)}
        </div>
    </div>
}

export default Talks;
