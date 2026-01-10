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
  
  // Case 4: Regular links - render as compact badges
  return (
    <a 
      key={link.name} 
      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-theme-bg-accent-light hover:bg-theme-bg-accent-medium border border-theme-border-accent-light hover:border-theme-border-accent-dark text-theme-accent-light hover:text-theme-accent rounded-lg transition-all duration-200" 
      href={link.link} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {link.name}
    </a>
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
    return <div className="text-theme-text-secondary my-4">{description}</div>;
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
    <div className="bg-base-200/30 backdrop-blur-sm border border-theme-border-medium rounded-2xl overflow-hidden hover:border-theme-border-accent-medium transition-all duration-300 h-full flex flex-col">
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4 gradient-heading">
          {title}
        </h2>
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-theme-text-muted">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendar} className="text-theme-accent" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-theme-accent" />
            <span>{place}</span>
          </div>
        </div>
        <div className="text-theme-text-secondary text-sm leading-relaxed">
          <Description
            description={description}
            descriptionMarkdown={descriptionMarkdown}
          />
        </div>
      </div>
      {externalLinks && externalLinks.length > 0 && (
        <div className="border-t border-theme-border-medium p-4 bg-theme-glass-light">
          <div className="flex flex-wrap gap-2">
            {externalLinks.map((link, index) => (
              <RenderLink key={index} {...link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TalkListItem;