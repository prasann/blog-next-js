import Talk, {ExternalLink} from "../types/talk";
import {CalendarIcon, LocationMarkerIcon} from "@heroicons/react/outline";
import IconWithText from "./utils/IconWithText";

const RenderLink = (link: ExternalLink) => {
    if (link.embed) {
        return <div className="iframe-container">
            <iframe src={link.link} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        </div>
    } else {
        return <div className="my-4 text-2xl">
            <a className="no-underline font-bold text-blue-700"
               href={link.link}>{link.name}</a></div>
    }
}

const TalkListItem = (
    {
        title, description, date, place, externalLinks
    }: Talk) => {
    return <div key={title} className="m-2 text-white grid md:grid-cols-2 rounded-xl shadow-xl p-2 border-2">
        <div className="text-black m-2 p-2 md:p-6 bg-white">
            <div className="text-gray-500 text-2xl font-bold">{title}</div>
            <div className="grid grid-cols-2 mt-4">
                <IconWithText text={date}>
                    <CalendarIcon className="icon-text"/>
                </IconWithText>
                <IconWithText text={place}>
                    <LocationMarkerIcon className="icon-text"/>
                </IconWithText>
            </div>
            <div className="text-gray-700">{description}</div>
        </div>

        <div className="text-black m-2 p-6 bg-white">
            {externalLinks.map(link => <RenderLink key={link.name} {...link}/>)}
        </div>
    </div>
}


export default TalkListItem;
