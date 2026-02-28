import React from "react";
import Image from "next/image";
import { Components } from "react-markdown";
import CodeBlock from "../CodeBlock";

const CustomComponentsForMarkdown : Partial<Components> = {
  // @ts-ignore
  pre({ children }: any) {
    return <CodeBlock>{children}</CodeBlock>;
  },
  // @ts-ignore
  p(paragraph: any) {
    const { node } = paragraph;
    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, "");
      const isPriority = image.properties.alt
        ?.toLowerCase()
        .includes("{priority}");
      const metaWidth = image.properties.alt.match(/{([^}]+)x/);
      const metaHeight = image.properties.alt.match(/xx([^}]+)}/);
      const width = metaWidth ? metaWidth[1] : "768";
      const height = metaHeight ? metaHeight[1] : "432";

      return (
        <div className="flex justify-center">
          <Image
            src={image.properties.src}
            width={width}
            height={height}
            className="postImg"
            alt={alt}
            priority={isPriority}
            style={{objectFit: "contain"}}
          />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },
  // @ts-ignore
  blockquote({ children }: any) {
    return <blockquote className="alert alert-info">{children}</blockquote>;
  },
  // @ts-ignore
  table({ children }: any) {
    return <table className="table table-zebra">{children}</table>;
  },
  // @ts-ignore
  a({ href, children }: any) {
    return <a href={href} className="link link-primary">{children}</a>;
  },
};

export default CustomComponentsForMarkdown;
