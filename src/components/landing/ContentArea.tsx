import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBlog, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "./../../images/profile.jpeg";

const Greeting = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 md:gap-6 mb-3">
        <span className="text-4xl md:text-6xl animate-wave inline-block origin-[70%_70%]">👋🏽</span>
        <h1 className="text-3xl md:text-6xl font-bold gradient-text drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">Hi, I'm Prasanna !!</h1>
      </div>
    </div>
  );
};

type IconLinkProps = {
  navigateLink: string;
  icon: any;
  linkText: string;
};

const IconLink = ({
  navigateLink,
  icon,
  linkText,
}: IconLinkProps) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  return (
    <button
      onClick={() => navigateTo(navigateLink)}
      className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-theme-glass-light backdrop-blur-md border border-theme-border-medium rounded-xl hover:bg-theme-glass-medium hover:border-theme-border-dark transition-all duration-300 hover:-translate-y-1"
    >
      <FontAwesomeIcon icon={icon} className="text-2xl md:text-4xl text-theme-accent group-hover:text-theme-accent-light transition-colors" />
      <span className="text-base md:text-lg font-semibold text-theme-text-primary transition-colors">{linkText}</span>
    </button>
  );
};

const Writeup = () => {
  return (
    <div className="space-y-4 text-justify text-theme-text-primary text-base md:text-xl">
      <p className="leading-normal">
        I'm a full-stack developer from the bustling city of Bengaluru, India—where navigating traffic is almost as challenging as debugging code 🤯 But yes, it's all about finding the right shortcuts, whether on the road or in the code! 🚗  I've led large teams to build high-performance enterprise platforms. When I'm not doing that, you'll find me enjoying coffee and coding ☕
      </p>
      <p className="leading-normal">
        I hold a master's degree in software systems 🎓, which is just a fancy way of saying I spent a lot of time in front of a computer screen. Currently, I'm working with the amazing folks at Microsoft, but I used to be a part of the Thoughtworks family. I'm a certified AWS solution architect and I have a few Azure certifications as well. Basically, if it's in the cloud, I can craft solutions all around 😎
      </p>
      <p className="leading-normal">
        I have hands-on experience with web technologies, which is a polite way of saying I've broken things on the internet a few times 💥. Since you're here, why not check out my blogs for some random musings ✍️ or visit my talks page to hear more about my adventures in tech 🏃‍♂️
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-6">
        <IconLink
          linkText="Blog"
          navigateLink="/blog"
          icon={faBlog}
        />
        <IconLink
          linkText="Talks"
          navigateLink="/talks"
          icon={faMicrophone}
        />
      </div>
    </div>
  );
};
const Picture = () => {
  return (
    <div className="relative group">
      {/* Enhanced glow behind photo */}
      <div className="absolute inset-0 w-40 md:w-52 lg:w-60 h-44 md:h-60 lg:h-68 bg-gradient-to-br from-blue-500/50 via-blue-400/40 to-blue-600/50 rounded-[50%] blur-3xl -z-10 group-hover:blur-2xl group-hover:scale-110 transition-all duration-500"></div>
      <div className="w-40 md:w-52 lg:w-60 h-44 md:h-60 lg:h-68 rounded-[50%] overflow-hidden ring-4 ring-blue-400/40 shadow-2xl shadow-blue-500/30 group-hover:ring-blue-300/60 group-hover:shadow-blue-400/50 transition-all duration-500">
        <Image
          placeholder="blur"
          src={ProfileImage}
          alt="profile pic"
          width={240}
          height={272}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="relative group">
      {/* Subtle glow effect */}
      
      <div className="relative bg-theme-glass-light backdrop-blur-lg border border-theme-border-medium rounded-3xl overflow-hidden hover:border-theme-border-dark transition-all duration-300">
        <div className="p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 items-center">
          <div className="flex-shrink-0">
            <Picture />
          </div>
          <div className="flex-1">
            <Greeting />
            <Writeup />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const Social = () => {
  return (
    <div className="flex justify-center gap-6 md:gap-8 py-3">
      <a
        aria-label="GitHub"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-white hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(100,100,100,0.5)]"
        href="https://github.com/prasann"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        aria-label="Twitter"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-twitter-blue hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(29,161,242,0.6)]"
        href="https://twitter.com/pvenk"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        aria-label="LinkedIn"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-linkedin-blue hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(0,119,181,0.6)]"
        href="https://www.linkedin.com/in/prasanna-v-nagarajan"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        aria-label="Email"
        className="text-3xl md:text-5xl text-theme-text-muted hover:text-success hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]"
        href="mailto:mail@prasanna.dev"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
    </div>
  );
};

const Container = () => {
  return (
    <div className="py-6 md:py-8 lg:py-10 pb-20 md:pb-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 md:space-y-8">
          <AboutMe />
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Container;
