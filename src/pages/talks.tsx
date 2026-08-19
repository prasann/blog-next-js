import talksJson from "../../content/_talks/entries.json";
import TalkListItem from "../components/TalkListItem";
import Talk from "../types/talk";
import MetaHeaders from "../components/MetaHeaders";
import TimelineShell from "../components/timeline/TimelineShell";
import { getTagCounts, getYearCounts } from "../lib/timeline";
import React from "react";
import Meta from "../types/meta";
import { getTalkDescription } from "../lib/api";

type Props = {
  talks: Talk[];
  tagCounts: Record<string, number>;
  yearCounts: Record<number, number>;
};

const Talks = ({ talks, tagCounts, yearCounts }: Props) => {
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
          <p className="text-lg text-theme-text-muted">Conference talks, presentations, and speaking engagements</p>
        </div>
        <TimelineShell
          items={talks}
          tagCounts={tagCounts}
          yearCounts={yearCounts}
          itemLabel="talks"
          itemKey={(talk) => talk.title}
          renderCard={(talk) => <TalkListItem {...talk} />}
        />
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
    props: {
      talks: allTalksWithDescription,
      tagCounts: getTagCounts(allTalksWithDescription),
      yearCounts: getYearCounts(allTalksWithDescription),
    },
  };
};

export default Talks;
