import ReactMarkdown from "react-markdown";
import React from "react";
import rehypeRaw from "rehype-raw";
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
      rehypePlugins={[rehypeRaw]}
    />
  );
};

export default RenderMarkdown;

