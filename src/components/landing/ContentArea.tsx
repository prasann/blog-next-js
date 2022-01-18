import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import {faEnvelope } from "@fortawesome/free-solid-svg-icons";

const AboutMe = () => {
    return <div className="rounded text-xl shadow-xl p-6 text-center">
        A computer science engineer, with a master’s degree in software systems. Builds and runs web applications with
        various stacks. Self taught geek, loves to work in teams and not a 10x programmer <a href="/about">Know more...</a>
    </div>
}

const Social = () => {
    return <div className="w-full rounded p-4 mt-4">
        <div className="flex flex-row justify-evenly">
            <FontAwesomeIcon icon={faGithub} size="2x"/>
            <FontAwesomeIcon icon={faTwitter} size="2x"/>
            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
            <FontAwesomeIcon icon={faEnvelope} size="2x"/>
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
