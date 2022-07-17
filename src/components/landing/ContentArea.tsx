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
    <>
      <div className="inline-block animate-wave text-2xl lg:text-6xl origin-[70%_70%]">
        👋🏽
      </div>
      <span className="text-2xl lg:text-6xl font-bold ml-4 mt-2">
        Hi, I'm Prasanna !!
      </span>
    </>
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
      className="w-1/2 highlight-animation text-center mr-4 p-2"
      onClick={() => navigateTo(navigateLink)}
    >
      <Image
        alt={altText}
        className="rounded"
        src={srcImg}
        width="160"
        height="160"
      />
      <div className="font-bold text-2xl">{linkText}</div>
    </div>
  );
};

const Writeup = () => {
  return (
    <div className="lg:text-justify">
      <div className="mt-4 lg:mt-8">
        I’m a full-stack developer based out of Bengaluru (India) with
        experience in building and leading development teams that build
        high-performance enterprise platforms and products.
      </div>
      <div className="mt-2">
        I’m a computer science engineer, with a master’s degree in software
        systems. I’m currently working with Microsoft. I used to work with
        Thoughtworks in the past. I’m a certified AWS solution architect and
        have hands-on experience with web technologies.
      </div>
      <div className="mt-2">
        Since you are here, do visit my blogs for my random writings and my
        talks page to know more about me
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
        layout="responsive"
        placeholder="blur"
        sizes="120vw"
        className="rounded-full"
        src={ProfileImage}
        alt="profile pic"
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
    <div className="w-full rounded p-4 mt-4">
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
    <div className="content-area bg-white rounded-xl">
      <AboutMe />

      {/*<img src="http://ghchart.rshah.org/prasann" alt="prasann's Github chart" />*/}
      <Social />
    </div>
  );
};

export default Container;
