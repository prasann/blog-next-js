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
    <div className="min-h-screen py-12">
      <MetaHeaders {...metaDetails} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-heading">
            Talks
          </h1>
          <p className="text-lg text-gray-400">Conference talks, presentations, and speaking engagements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {talks.map((talk) => (
            <TalkListItem key={talk.title} {...talk} />
          ))}
        </div>
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
