import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Engage = () => {
    return <div className="bg-white flex flex-row">
        <div className="mx-2">
            <FontAwesomeIcon className="cursor-pointer" icon={faTwitter} size="2x"/>
            <span>Share</span>
        </div>
        <div className="mx-2">
            <FontAwesomeIcon className="cursor-pointer" icon={faHeart} size="2x"/>
            <span>Like</span>
        </div>
    </div>
}

export default Engage;
