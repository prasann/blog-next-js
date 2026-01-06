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
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-5xl animate-wave inline-block origin-[70%_70%]">👋🏽</span>
        <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Hi, I'm Prasanna !!</h1>
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
      className="w-1/2 cursor-pointer hover:scale-105 transition-transform mr-4 p-2 flex flex-col items-center"
      onClick={() => navigateTo(navigateLink)}
    >
      <Image
        alt={altText}
        className="rounded-lg shadow-lg"
        src={srcImg}
        width="160"
        height="160"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <div className="font-bold text-2xl mt-2">{linkText}</div>
    </div>
  );
};

const Writeup = () => {
  return (
    <div className="space-y-4 text-base-content leading-relaxed">
      <p>
        I'm a full-stack developer from the bustling city of Bengaluru, India—where navigating traffic is almost as challenging as debugging code 🤯 But yes, it's all about finding the right shortcuts, whether on the road or in the code! 🚗  I've led large teams to build high-performance enterprise platforms. When I'm not doing that, you'll find me enjoying coffee and coding ☕
      </p>
      <p>
        I hold a master's degree in software systems 🎓, which is just a fancy way of saying I spent a lot of time in front of a computer screen. Currently, I'm working with the amazing folks at Microsoft, but I used to be a part of the Thoughtworks family. I'm a certified AWS solution architect and I have a few Azure certifications as well. Basically, if it's in the cloud, I can craft solutions all around 😎
      </p>
      <p>
        I have hands-on experience with web technologies, which is a polite way of saying I've broken things on the internet a few times 💥. Since you're here, why not check out my blogs for some random musings ✍️ or visit my talks page to hear more about my adventures in tech 🏃‍♂️
      </p>
      <div className="mt-6">
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
    <div className="avatar">
      <div className="w-32 lg:w-40 rounded-full">
        <Image
          placeholder="blur"
          src={ProfileImage}
          alt="profile pic"
          width={160}
          height={160}
        />
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <div className="card bg-base-200 shadow-2xl border border-base-300">
      <div className="card-body">
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
  );
};

const Social = () => {
  return (
    <div className="card bg-base-200 shadow-2xl border border-base-300">
      <div className="card-body">
        <div className="flex justify-center gap-8">
          <a
            aria-label="GitHub"
            className="btn btn-circle btn-ghost text-2xl hover:text-primary"
            href="https://github.com/prasann"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            aria-label="Twitter"
            className="btn btn-circle btn-ghost text-2xl hover:text-info"
            href="https://twitter.com/pvenk"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            aria-label="LinkedIn"
            className="btn btn-circle btn-ghost text-2xl hover:text-info"
            href="https://www.linkedin.com/in/prasanna-v-nagarajan"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            aria-label="Email"
            className="btn btn-circle btn-ghost text-2xl hover:text-success"
            href="mailto:mail@prasanna.dev"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  );
};

const Container = () => {
  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="space-y-8">
        <AboutMe />
        <Social />
      </div>
    </div>
  );
};

export default Container;
