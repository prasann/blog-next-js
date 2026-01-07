import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "./../../images/profile.jpeg";
import blogImage from "./../../images/blog.jpg";
import talkImage from "./../../images/speak.jpg";

const Greeting = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-5xl animate-wave inline-block origin-[70%_70%]">👋🏽</span>
        <h1 className="text-5xl lg:text-6xl font-bold gradient-text drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">Hi, I'm Prasanna !!</h1>
      </div>
    </div>
  );
};

type ImageLinkProps = {
  navigateLink: string;
  srcImg: StaticImageData;
  altText: string;
  linkText: string;
};

const ImageLink = ({
  navigateLink,
  srcImg,
  altText,
  linkText,
}: ImageLinkProps) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  return (
    <div
      className="w-1/2 cursor-pointer group p-2 flex flex-col items-center"
      onClick={() => navigateTo(navigateLink)}
    >
      <div className="relative">
        {/* Gradient border effect matching card style */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <Image
            alt={altText}
            className="rounded-xl transform group-hover:scale-110 transition-transform duration-300"
            src={srcImg}
            width="180"
            height="180"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <div className="font-bold text-2xl mt-4 text-gray-100 group-hover:text-blue-400 transition-colors">{linkText}</div>
    </div>
  );
};

const Writeup = () => {
  return (
    <div className="space-y-4 text-gray-100 leading-relaxed text-lg">
      <p>
        I'm a full-stack developer from the bustling city of Bengaluru, India—where navigating traffic is almost as challenging as debugging code 🤯 But yes, it's all about finding the right shortcuts, whether on the road or in the code! 🚗  I've led large teams to build high-performance enterprise platforms. When I'm not doing that, you'll find me enjoying coffee and coding ☕
      </p>
      <p>
        I hold a master's degree in software systems 🎓, which is just a fancy way of saying I spent a lot of time in front of a computer screen. Currently, I'm working with the amazing folks at Microsoft, but I used to be a part of the Thoughtworks family. I'm a certified AWS solution architect and I have a few Azure certifications as well. Basically, if it's in the cloud, I can craft solutions all around 😎
      </p>
      <p>
        I have hands-on experience with web technologies, which is a polite way of saying I've broken things on the internet a few times 💥. Since you're here, why not check out my blogs for some random musings ✍️ or visit my talks page to hear more about my adventures in tech 🏃‍♂️
      </p>
      <div className="mt-4">
        <div className="flex justify-center gap-4">
          <ImageLink
            altText="link to blog"
            linkText="Blog"
            navigateLink="/blog"
            srcImg={blogImage}
          />
          <ImageLink
            altText="link to talks"
            linkText="Talks"
            navigateLink="/talks"
            srcImg={talkImage}
          />
        </div>
      </div>
    </div>
  );
};
const Picture = () => {
  return (
    <div className="relative group">
      {/* Blue/purple glow behind photo */}
      <div className="absolute inset-0 w-48 lg:w-56 h-56 lg:h-64 bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-teal-500/40 rounded-[50%] blur-3xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
      <div className="w-48 lg:w-56 h-56 lg:h-64 rounded-[50%] overflow-hidden ring-4 ring-purple-500/50 shadow-2xl shadow-purple-500/30 group-hover:ring-blue-400 group-hover:shadow-blue-400/40 transition-all duration-300">
        <Image
          placeholder="blur"
          src={ProfileImage}
          alt="profile pic"
          width={224}
          height={256}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="relative group">
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative card bg-slate-800/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
        <div className="card-body p-6 md:p-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
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
    <div className="relative group">
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative card bg-slate-800/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
        <div className="card-body p-6">
        <div className="flex justify-center gap-6">
          <a
            aria-label="GitHub"
            className="btn btn-circle btn-lg bg-base-100 hover:bg-base-300 border-base-300 text-base-content hover:scale-110 transition-transform"
            href="https://github.com/prasann"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
          <a
            aria-label="Twitter"
            className="btn btn-circle btn-lg bg-base-100 hover:bg-twitter-blue border-base-300 text-twitter-blue hover:text-white hover:scale-110 transition-all"
            href="https://twitter.com/pvenk"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="xl" />
          </a>
          <a
            aria-label="LinkedIn"
            className="btn btn-circle btn-lg bg-base-100 hover:bg-linkedin-blue border-base-300 text-linkedin-blue hover:text-white hover:scale-110 transition-all"
            href="https://www.linkedin.com/in/prasanna-v-nagarajan"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
          <a
            aria-label="Email"
            className="btn btn-circle btn-lg bg-base-100 hover:bg-success border-base-300 text-success hover:text-white hover:scale-110 transition-all"
            href="mailto:mail@prasanna.dev"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

const Container = () => {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <AboutMe />
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Container;
