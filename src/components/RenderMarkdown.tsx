import ReactMarkdown from "react-markdown";
import React from "react";
import CustomComponentsForMarkdown from "./utils/CustomComponentsForMarkdown";

type Props = {
  content: string;
};

const RenderMarkdown = ({ content }: Props) => {
  // @ts-ignore
  return (
    <ReactMarkdown
      components={CustomComponentsForMarkdown}
      children={content}
    />
  );
};

export default RenderMarkdown;
