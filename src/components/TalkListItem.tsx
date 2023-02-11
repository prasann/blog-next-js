import Talk, { ExternalLink } from "../types/talk";
import IconWithText from "./utils/IconWithText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { getTalkDescription } from "../lib/api";
import RenderMarkdown from "./RenderMarkdown";

const RenderLink = (link: ExternalLink) => {
  if (link.embed) {
    return (
      <div key={link.name} className="my-4 iframe-container">
        <iframe
          src={link.link}
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else {
    return (
      <div key={link.name} className="my-4 text-2xl">
        <a className="no-underline font-bold text-blue-700" href={link.link}>
          {link.name}
        </a>
      </div>
    );
  }
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
    return <div className="text-gray-700 my-4">{description}</div>;
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
    <div className="m-2 text-white grid lg:grid-cols-3 rounded-xl shadow-xl p-2 border-2">
      <div className="text-black m-2 p-2 lg:p-6 bg-white lg:col-span-2">
        <div className="text-gray-600 text-3xl font-bold">{title}</div>
        <div className="grid grid-cols-2 mt-4">
          <IconWithText text={date}>
            <FontAwesomeIcon
              className="text-green-600"
              icon={faCalendar}
              size="2x"
            />
          </IconWithText>
          <IconWithText text={place}>
            <FontAwesomeIcon
              className="text-twitter-blue"
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
      <div className="text-black m-2 p-6 bg-white">
        {externalLinks.map((link) => (
          <RenderLink key={Math.random()} {...link} />
        ))}
      </div>
    </div>
  );
};

export default TalkListItem;
