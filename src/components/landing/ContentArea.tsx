import Link from 'next/link'
import Card from "./Card";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const AboutMe = () => {
    return <div className="rounded text-xl shadow-xl l:m-12 p-6 text-justify leading-loose">
        A computer science engineer, with a master’s degree in software systems.
        A full-stack developer with experience in building and leading development teams that build high-performance enterprise platforms and products.
        Loves to work in teams and not a 10x programmer <Link href={"/about"}>Know more...</Link>
        <div>
        <div></div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
        
        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>
        <div>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
        The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>
    </div>
}

const Social = () => {
    return <div className="w-full rounded p-4 mt-4">
        <div className="flex flex-row justify-evenly">
            <a aria-label="github handle prasann"
               className="text-black highlight-animation text-center" rel="noreferrer" href="https://github.com/prasann" target="_blank">
                <FontAwesomeIcon aria-hidden={true} icon={faGithub} size="2x"/>
            </a>
            <a aria-label="twitter handle pvenk"
               className="highlight-animation text-center" rel="noreferrer" href="https://twitter.com/pvenk" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="text-twitter-blue" icon={faTwitter} size="2x"/>
            </a>
            <a aria-label="linkedin handle pvenk"
                className="highlight-animation text-center" rel="noreferrer" href="https://www.linkedin.com/in/pvenk" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="text-linkedin-blue" icon={faLinkedin} size="2x"/>
            </a>
            <a aria-label="email - mail@prasanna.dev"
               className="text-center hidden md:inline" rel="noreferrer" href="mailto:mail@prasanna.dev" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="highlight-animation text-green-600" icon={faEnvelope} size="2x"/>
            </a>
        </div>
        <div className="flex flex-row justify-evenly inline md:hidden mt-4">
            <a aria-label="email - mail@prasanna.dev"
               className="text-center" href="mailto:mail@prasanna.dev" target="_blank" rel="noreferrer">
                <FontAwesomeIcon aria-hidden={true} className="highlight-animation text-green-600" icon={faEnvelope} size="2x"/>
                <div className="mx-1 inline-block">mail@prasanna.dev</div>
            </a>
        </div>
    </div>
}

const Container = () => {
    return <div className="content-area bg-white rounded-xl">
        <AboutMe/>
        
        {/*<img src="http://ghchart.rshah.org/prasann" alt="prasann's Github chart" />*/}
        <Social/>
    </div>
}

export default Container;
