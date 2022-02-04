import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {event} from "../../lib/googleTag";

type Props = {
    description: string,
}

const shareOnTwitter = (description: string) => {
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${description}&url=${url}`);
}

const likeThePost = () => {
    const postName = window.location.href.split("posts/")[1]
    const gTagEvent = {
        action: "post_likes",
        category: postName,
        label: postName,
        value: 1
    }
    event(gTagEvent)
}

const Engage = ({description}: Props) => {
    return <div className="bg-white flex flex-row">
        <div className="mx-2 flex flex-row highlight-animation" onClick={() => shareOnTwitter(description)}>
            <FontAwesomeIcon className="cursor-pointer text-twitter-blue" icon={faTwitter} size="2x"/>
            <div className="align-middle mx-2 text-bold">Share</div>
        </div>
        <div className="mx-2 flex flex-row highlight-animation" onClick={likeThePost}>
            <FontAwesomeIcon className="cursor-pointer text-heart-red" icon={faHeart} size="2x"/>
            <div className="align-middle mx-2 text-bold">Like</div>
        </div>
    </div>
}

export default Engage;
