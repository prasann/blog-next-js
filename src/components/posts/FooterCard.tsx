import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FooterCard = () => {
    return <footer className="prose max-w-none mx-20 my-10 text-center p-6 bg-white rounded-xl">
        <div className="flex justify-between">
            <div className="mx-10"> <FontAwesomeIcon className="cursor-pointer" icon={faUser} size="2x"/> </div>
            <div> Prasanna is a full stack web developer, with exposure to various programming languages.
                Uses mostly Java, Javascript these days and got ~13 years of architecting and coding enterprise software solutions. </div>
        </div>
    </footer>
}

export default FooterCard;
