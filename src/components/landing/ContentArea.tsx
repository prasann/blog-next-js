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
    <div className="">
      <div className="inline-block animate-wave text-2xl lg:text-6xl origin-[70%_70%] greeting-color">
        👋🏽
      </div>
      <span className="text-2xl lg:text-6xl font-bold ml-4 mt-2 greeting-color">
        Hi, I'm Prasanna !!
      </span>
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
      className="w-1/2 highlight-animation mr-4 p-2 flex flex-col items-center"
      onClick={() => navigateTo(navigateLink)}
    >
      <Image
        alt={altText}
        className="rounded"
        src={srcImg}
        width="160"
        height="160"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <div className="font-bold text-2xl">{linkText}</div>
    </div>
  );
};

const Writeup = () => {
  return (
    <div className="lg:text-justify">
      <div className="mt-4 lg:mt-8">
        I'm a full-stack developer hailing from the bustling city of Bengaluru, India. When I'm not busy building and leading development teams to create high-performance enterprise platforms and products, you can find me indulging in my love for coffee and coding (sometimes simultaneously).
      </div>
      <div className="mt-2">
        I hold a master's degree in software systems, which is just a fancy way of saying I spent a lot of time in front of a computer screen. Currently, I'm working with the amazing folks at Microsoft, but I used to be a part of the Thoughtworks family. Yes, I’m a certified AWS solution architect, which means I can architect solutions in the cloud while making it rain (metaphorically, of course). Oh, and did I mention I have multiple Azure certifications too? Basically, if it's in the cloud, I've got it covered!
      </div>
      <div className="mt-2">
      I have hands-on experience with web technologies, which is a polite way of saying I've broken the internet a few times. Since you're here, why not check out my blogs for some random musings or visit my talks page to hear more about my adventures in tech 🏃‍♂️
      </div>
      <div className="mt-8">
        <div className="flex">
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
    <div className="pic-wrapper">
      <Image
        placeholder="blur"
        className="rounded-full"
        src={ProfileImage}
        alt="profile pic"
        sizes="120vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};

const AboutMe = () => {
  return (
    <div
      id="about-me"
      className="rounded text-xl shadow-xl p-2 leading-relaxed"
    >
      <div className="about-me-container">
        <div className="pic-container">
          <Picture />
        </div>
        <div className="desc-container">
          <Greeting />
          <Writeup />
        </div>
      </div>
    </div>
  );
};

const Social = () => {
  return (
    <div className="w-full social-bg rounded p-4 mt-4">
      <div className="flex flex-row justify-evenly">
        <a
          aria-label="github handle prasann"
          className="text-black highlight-animation text-center lg:text-2xl"
          rel="noreferrer"
          href="https://github.com/prasann"
          target="_blank"
        >
          <FontAwesomeIcon aria-hidden={true} icon={faGithub} size="2x" />
        </a>
        <a
          aria-label="twitter handle pvenk"
          className="highlight-animation text-center lg:text-2xl"
          rel="noreferrer"
          href="https://twitter.com/pvenk"
          target="_blank"
        >
          <FontAwesomeIcon
            aria-hidden={true}
            className="text-twitter-blue"
            icon={faTwitter}
            size="2x"
          />
        </a>
        <a
          aria-label="linkedin handle pvenk"
          className="highlight-animation text-center lg:text-2xl"
          rel="noreferrer"
          href="https://www.linkedin.com/in/pvenk"
          target="_blank"
        >
          <FontAwesomeIcon
            aria-hidden={true}
            className="text-linkedin-blue"
            icon={faLinkedin}
            size="2x"
          />
        </a>
        <a
          aria-label="email - mail@prasanna.dev"
          className="text-center lg:text-2xl"
          rel="noreferrer"
          href="mailto:mail@prasanna.dev"
          target="_blank"
        >
          <FontAwesomeIcon
            aria-hidden={true}
            className="highlight-animation text-green-600"
            icon={faEnvelope}
            size="2x"
          />
        </a>
      </div>
    </div>
  );
};

const Container = () => {
  return (
    <div className="content-area rounded-xl">
      <AboutMe />
      <Social />
    </div>
  );
};

export default Container;
