import talksJson from "../../content/_talks/entries.json";
import TalkListItem from "../components/TalkListItem";
import Talk from "../types/talk";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";
import Meta from "../types/meta";
import { getTalkDescription } from "../lib/api";

type Props = {
  talks: Talk[];
};

const Talks = ({ talks }: Props) => {
  const metaDetails: Meta = {
    title: "Prasanna's - Talks",
    description: "lists of all the talks that i have done so far.",
  };
  return (
    <div>
      <MetaHeaders {...metaDetails} />
      <div className="content-area bg-base-100 rounded-xl">
        {talks.map((talk) => (
          <TalkListItem key={talk.title} {...talk} />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const allTalks = talksJson;
  const allTalksWithDescription: Talk[] = [];
  allTalks.forEach((talk) => {
    if (talk.descriptionFile) {
      const talkWithDescription = Object.assign(talk, {
        descriptionMarkdown: getTalkDescription(talk.descriptionFile),
      });
      allTalksWithDescription.push(talkWithDescription);
    } else {
      allTalksWithDescription.push(talk);
    }
  });
  return {
    props: { talks: allTalksWithDescription },
  };
};

export default Talks;
