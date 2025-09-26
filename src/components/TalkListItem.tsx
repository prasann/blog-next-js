import Talk, { ExternalLink } from "../types/talk";
import IconWithText from "./utils/IconWithText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getTalkDescription } from "../lib/api";
import RenderMarkdown from "./RenderMarkdown";
import GitHubCard from "./GitHubCard";
import LazyEmbed from "./LazyEmbed";
import BlogCard, { isBlogPost } from "./BlogCard";

// Helper function to detect GitHub repository URLs
const isGitHubRepo = (url: string): boolean => {
  const githubPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
  return githubPattern.test(url);
};

// Helper function to detect embeddable content
const isEmbeddableContent = (url: string): boolean => {
  return (
    url.includes('docs.google.com/presentation') ||
    url.includes('drive.google.com') ||
    url.includes('youtube.com/embed') ||
    url.includes('youtu.be') ||
    url.includes('slideshare.net') ||
    url.includes('speakerdeck.com')
  );
};

const RenderLink = (link: ExternalLink) => {
  // Case 1: GitHub repository - render as GitHub card
  if (isGitHubRepo(link.link)) {
    return (
      <div key={link.name} className="my-4">
        <GitHubCard url={link.link} name={link.name} />
      </div>
    );
  }
  
  // Case 2: Blog post - render as blog card (Twitter card style)
  if (isBlogPost(link.link)) {
    return (
      <div key={link.name} className="my-4">
        <BlogCard url={link.link} name={link.name} />
      </div>
    );
  }
  
  // Case 3: Embeddable content (Google Slides, YouTube, etc.) - use lazy loading
  if (isEmbeddableContent(link.link)) {
    return (
      <div key={link.name} className="my-4">
        <LazyEmbed src={link.link} name={link.name} />
      </div>
    );
  }
  
  // Case 4: Regular links - render as before
  return (
    <div key={link.name} className="my-4 text-2xl">
      <a className="no-underline font-bold text-blue-400" href={link.link} target="_blank" rel="noopener noreferrer">
        {link.name}
      </a>
    </div>
  );
};

type DescriptionProps = {
  description?: string;
  descriptionMarkdown?: string;
};

const Description = ({
  description,
  descriptionMarkdown,
}: DescriptionProps) => {
  if (descriptionMarkdown) {
    return <RenderMarkdown content={descriptionMarkdown} />;
  } else {
    return <div className="text-gray-300 my-4">{description}</div>;
  }
};

const TalkListItem = ({
  title,
  description,
  descriptionMarkdown,
  date,
  place,
  externalLinks,
}: Talk) => {
  return (
    <div className="m-2 text-white grid lg:grid-cols-3 rounded-xl shadow-xl p-2 border-2 border-gray-700 bg-gray-800">
      <div className="text-white m-2 p-2 lg:p-6 bg-gray-900 lg:col-span-2">
        <div className="text-gray-300 text-3xl font-bold">{title}</div>
        <div className="grid grid-cols-2 mt-4">
          <IconWithText text={date}>
            <FontAwesomeIcon
              className="text-pink-400"
              icon={faCalendar}
              size="2x"
            />
          </IconWithText>
          <IconWithText text={place}>
            <FontAwesomeIcon
              className="text-red-400"
              icon={faMapMarkerAlt}
              size="2x"
            />
          </IconWithText>
        </div>
        <Description
          description={description}
          descriptionMarkdown={descriptionMarkdown}
        />
      </div>
      <div className="text-white m-2 p-6 bg-gray-900">
        {externalLinks.map((link) => (
          <RenderLink key={Math.random()} {...link} />
        ))}
      </div>
    </div>
  );
};

export default TalkListItem;