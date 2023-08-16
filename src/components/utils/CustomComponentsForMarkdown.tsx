import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import { CodeProps } from "react-markdown/lib/ast-to-react";

const CustomComponentsForMarkdown = {
  // @ts-ignore
  code({ node, inline, className, children, ...props } :CodeProps) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...(props as any)}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // @ts-ignore
  p(paragraph) {
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
        <div className="text-center">
          <Image
            src={image.properties.src}
            width={width}
            height={height}
            className="postImg"
            alt={alt}
            priority={isPriority}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },
};

export default CustomComponentsForMarkdown;
