export type ExternalLink = {
  name: string;
  link: string;
  embed?: boolean; // Made optional since we now use auto-detection
};

type Talk = {
  title: string;
  date: string;
  place: string;
  tags: string[];
  description?: string;
  descriptionMarkdown?: string;
  externalLinks: ExternalLink[];
};

export default Talk;
