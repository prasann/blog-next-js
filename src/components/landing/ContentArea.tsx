import Link from 'next/link'
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const AboutMe = () => {
    return <div className="rounded text-xl shadow-xl p-2 leading-relaxed">
        <div className='flex flex-col lg:flex-row mb-4'>
            <div className='inline lg:w-1/4 lg:mt-12'>
                <img className="rounded-full" 
                src="https://avatars.githubusercontent.com/u/380340?v=4" alt="profile pic" />
            </div>
            <div className='lg:w-3/4 p-4 lg:ml-8 lg:mr-4'>
                <div className="inline-block animate-wave text-2xl lg:text-6xl origin-[70%_70%]">👋🏽</div>
                <span className="text-2xl lg:text-6xl font-bold ml-4 mt-2">Hi, I'm Prasanna !!</span>
                <div className='text-justify'>
                <div className='mt-8'>
                    I’m a full-stack developer based out of Bengaluru (India) with experience in building and leading development teams that build high-performance enterprise platforms and products.
                </div>
                <div className='mt-2'>
                    I’m a computer science engineer, with a master’s degree in software systems.  I’m currently working with Microsoft. I used to work with Thoughtworks in the past.  I’m a certified AWS solution architect and have hands-on experience with web technologies.
                </div>
                <div className='mt-2'>
                    Since you are here, do visit my blogs for my random writings and my talks page to know more about me
                </div>
                <div className='mt-8'>
                    <Card title='My blog' path='/blog' description='Blog'/>
                </div>
                </div>
            </div>
        </div>
    </div>
}

const Social = () => {
    return <div className="w-full rounded p-4 mt-4">
        <div className="flex flex-row justify-evenly">
            <a aria-label="github handle prasann"
                className="text-black highlight-animation text-center" rel="noreferrer" href="https://github.com/prasann" target="_blank">
                <FontAwesomeIcon aria-hidden={true} icon={faGithub} size="3x" />
            </a>
            <a aria-label="twitter handle pvenk"
                className="highlight-animation text-center" rel="noreferrer" href="https://twitter.com/pvenk" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="text-twitter-blue" icon={faTwitter} size="3x" />
            </a>
            <a aria-label="linkedin handle pvenk"
                className="highlight-animation text-center" rel="noreferrer" href="https://www.linkedin.com/in/pvenk" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="text-linkedin-blue" icon={faLinkedin} size="3x" />
            </a>
            <a aria-label="email - mail@prasanna.dev"
                className="text-center hidden md:inline" rel="noreferrer" href="mailto:mail@prasanna.dev" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="highlight-animation text-green-600" icon={faEnvelope} size="3x" />
            </a>
        </div>
        <div className="flex-row justify-evenly inline md:hidden mt-4">
            <a aria-label="email - mail@prasanna.dev"
                className="text-center" href="mailto:mail@prasanna.dev" target="_blank" rel="noreferrer">
                <FontAwesomeIcon aria-hidden={true} className="highlight-animation text-green-600" icon={faEnvelope} size="3x" />
                <div className="mx-1 inline-block">mail@prasanna.dev</div>
            </a>
        </div>
    </div>
}

const Container = () => {
    return <div className="content-area bg-white rounded-xl">
        <AboutMe />

        {/*<img src="http://ghchart.rshah.org/prasann" alt="prasann's Github chart" />*/}
        <Social />
    </div>
}

export default Container;
