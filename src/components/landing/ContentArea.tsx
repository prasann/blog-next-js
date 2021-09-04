import FeaturedTalks from "./FeaturedTalks";
import FeaturedPosts from "./FeaturedPosts";
import GithubIcon from './../../images/icons8-github.svg'
import LinkedInIcon from './../../images/icons8-linkedin.svg'
import TwitterIcon from './../../images/icons8-twitter.svg'

const AboutMe = () => {
    return <div className="rounded text-xl text-red-700 shadow-xl p-6 italic text-center">
        A computer science engineer, with a master’s degree in software systems. Builds and runs web applications with
        various stacks. Self taught geek, loves to work in teams and not a 10x programmer
    </div>
}

const Social = () => {
    return <div className="w-full rounded p-4 mt-4">
        <div className="flex flex-row justify-evenly">
            <img src={GithubIcon} alt="Github icon"/>
            <img src={TwitterIcon} alt="Twitter icon"/>
            <img src={LinkedInIcon} alt="LinkedIn icon"/>
        </div>
    </div>
}

const Container = () => {
    return <div className="content-area bg-white rounded-xl">
        <AboutMe/>
        <div className="w-full">
            <div className="flex flex-wrap justify-evenly w-full rounded p-4 mt-4">
                <FeaturedTalks/>
            </div>
            <div className="flex flex-wrap justify-evenly w-full rounded p-4 mt-4">
                <FeaturedPosts/>
            </div>
        </div>
        <Social/>
    </div>
}

export default Container;
