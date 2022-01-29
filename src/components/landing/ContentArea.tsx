import Link from 'next/link'
import Card from "./Card";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const AboutMe = () => {
    return <div className="rounded text-xl shadow-xl p-6 text-center">
        A computer science engineer, with a master’s degree in software systems. Builds and runs web applications with
        various stacks. Self taught geek, loves to work in teams and not a 10x programmer <Link href="/about">Know
        more...</Link>
    </div>
}

const Social = () => {
    return <div className="w-full rounded p-4 mt-4">
        <div className="flex flex-row justify-evenly">
            <a className="text-black highlight-animation text-center" rel="noreferrer" href="https://github.com/prasann" target="_blank">
                <FontAwesomeIcon icon={faGithub} size="2x"/>
            </a>
            <a className="highlight-animation text-center" rel="noreferrer" href="https://twitter.com/pvenk" target="_blank">
                <FontAwesomeIcon className="text-twitter-blue" icon={faTwitter} size="2x"/>
            </a>
            <a className="highlight-animation text-center" rel="noreferrer" href="https://www.linkedin.com/in/pvenk" target="_blank">
                <FontAwesomeIcon className="text-linkedin-blue" icon={faLinkedin} size="2x"/>
            </a>
            <a className="text-center hidden md:inline" rel="noreferrer" href="mailto:mail@prasanna.dev" target="_blank">
                <FontAwesomeIcon className="highlight-animation text-green-600" icon={faEnvelope} size="2x"/>
            </a>
        </div>
        <div className="flex flex-row justify-evenly inline md:hidden mt-4">
            <a className="text-center" href="mailto:mail@prasanna.dev" target="_blank" rel="noreferrer">
                <FontAwesomeIcon className="highlight-animation text-green-600" icon={faEnvelope} size="2x"/>
                <div className="mx-1 inline-block">mail@prasanna.dev</div>
            </a>
        </div>
    </div>
}

const Container = () => {
    return <div className="content-area bg-white rounded-xl">
        <AboutMe/>
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 mt-4 justify-items-center">
                <Card title="Talks"
                      description="My talks"
                      color="variant1"
                      path="/talks"/>
                <Card title="Blog"
                      description="My blog"
                      color="variant1"
                      path="/blog"/>
            </div>
        </div>
        <Social/>
    </div>
}

export default Container;
