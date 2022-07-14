import Link from 'next/link'
import Card from "./Card";
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "./../../images/profile.jpeg";

const AboutMe = () => {
    return <div className="rounded text-xl shadow-xl p-2 leading-relaxed">
        <div className='flex flex-col lg:flex-row mb-4 items-center justify-center'>
            <div className='ml-2 w-2/3 flex flex-row items-center justify-center lg:w-1/4 lg:mt-12'>
                <div className='w-2/3 lg:w-full text-center'>
                    <Image layout="responsive" placeholder='blur'
                        sizes='120vw'
                        className="rounded-full" src={ProfileImage} alt="profile pic" />
                </div>
            </div>
            <div className='lg:w-3/4 p-4 lg:ml-8 lg:mr-4'>
                <div className="inline-block animate-wave text-2xl lg:text-6xl origin-[70%_70%]">👋🏽</div>
                <span className="text-2xl lg:text-6xl font-bold ml-4 mt-2">Hi, I'm Prasanna !!</span>
                <div className='lg:text-justify'>
                <div className='mt-4 lg:mt-8'>
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
                className="text-black highlight-animation text-center lg:text-2xl" rel="noreferrer" href="https://github.com/prasann" target="_blank">
                <FontAwesomeIcon aria-hidden={true} icon={faGithub} size="2x" />
            </a>
            <a aria-label="twitter handle pvenk"
                className="highlight-animation text-center lg:text-2xl" rel="noreferrer" href="https://twitter.com/pvenk" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="text-twitter-blue" icon={faTwitter} size="2x" />
            </a>
            <a aria-label="linkedin handle pvenk"
                className="highlight-animation text-center lg:text-2xl" rel="noreferrer" href="https://www.linkedin.com/in/pvenk" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="text-linkedin-blue" icon={faLinkedin} size="2x" />
            </a>
            <a aria-label="email - mail@prasanna.dev"
                className="text-center lg:text-2xl" rel="noreferrer" href="mailto:mail@prasanna.dev" target="_blank">
                <FontAwesomeIcon aria-hidden={true} className="highlight-animation text-green-600" icon={faEnvelope} size="2x" />
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
