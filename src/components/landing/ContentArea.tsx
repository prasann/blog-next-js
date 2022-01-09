import GithubIcon from './../../images/icons8-github.svg'
import LinkedInIcon from './../../images/icons8-linkedin.svg'
import TwitterIcon from './../../images/icons8-twitter.svg'
import GmailIcon from './../../images/icons8-gmail.svg'
import Card from "./Card";

const AboutMe = () => {
    return <div className="rounded text-xl text-red-700 shadow-xl p-6 italic text-center">
        A computer science engineer, with a master’s degree in software systems. Builds and runs web applications with
        various stacks. Self taught geek, loves to work in teams and not a 10x programmer <a href="/about">Know more...</a>
    </div>
}

const Social = () => {
    return <div className="w-full rounded p-4 mt-4">
        <div className="flex flex-row justify-evenly">
            <img src={GithubIcon} alt="Github icon"/>
            <img src={TwitterIcon} alt="Twitter icon"/>
            <img src={LinkedInIcon} alt="LinkedIn icon"/>
            <img src={GmailIcon} alt="Gmail icon"/>
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
