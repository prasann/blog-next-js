import Talk, { ExternalLink } from "../types/talk";
import IconWithText from "./utils/IconWithText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getTalkDescription } from "../lib/api";
import RenderMarkdown from "./RenderMarkdown";
import GitHubCard from "./GitHubCard";
import LazyEmbed from "./LazyEmbed";

// Helper function to detect GitHub repository URLs
const isGitHubRepo = (url: string): boolean => {
  const githubPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
  return githubPattern.test(url);
};

const RenderLink = (link: ExternalLink) => {
  // Case 1: Embedded content (Google Slides, videos, etc.) - use lazy loading
  if (link.embed) {
    return (
      <div key={link.name} className="my-4">
        <LazyEmbed src={link.link} name={link.name} />
      </div>
    );
  }
  
  // Case 2: GitHub repository - render as GitHub card
  if (isGitHubRepo(link.link)) {
    return (
      <div key={link.name} className="my-4">
        <GitHubCard url={link.link} name={link.name} />
      </div>
    );
  }
  
  // Case 3: Regular links - render as before
  return (
    <div key={link.name} className="my-4 text-2xl">
      <a className="no-underline font-bold text-blue-400" href={link.link}>
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