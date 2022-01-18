import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Engage = () => {
    return <div className="bg-white flex flex-row">
        <FontAwesomeIcon icon={faTwitter}/>
        <FontAwesomeIcon icon={faHeart}/>
    </div>
}

export default Engage;
