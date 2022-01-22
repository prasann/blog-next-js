import {faTwitter} from "@fortawesome/free-brands-svg-icons";
// import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Engage = () => {
    return <div className="bg-white flex flex-row">
        <div className="mx-2 flex flex-row highlight-animation">
            <FontAwesomeIcon className="cursor-pointer text-twitter-blue" icon={faTwitter} size="2x"/>
            <div className="align-middle mx-2 text-bold">Share</div>
        </div>
        <div className="mx-2 flex flex-row highlight-animation">
            <FontAwesomeIcon className="cursor-pointer text-heart-red" icon={faHeart} size="2x"/>
            <div className="align-middle mx-2 text-bold">Like</div>
        </div>
    </div>
}

export default Engage;
