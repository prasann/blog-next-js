export type ExternalLink = {
  name: string;
  link: string;
  embed: boolean;
};

type Talk = {
  title: string;
  date: string;
  place: string;
  description?: string;
  descriptionMarkdown?: string;
  externalLinks: ExternalLink[];
};

export default Talk;
