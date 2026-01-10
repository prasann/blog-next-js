import React, { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false);

  const extractLanguage = (className?: string): string => {
    if (!className) return "";
    const match = className.match(/language-(\w+)/);
    return match ? match[1] : "";
  };

  const extractCode = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (React.isValidElement(node) && node.props.children) {
      if (Array.isArray(node.props.children)) {
        return node.props.children.map(extractCode).join("");
      }
      return extractCode(node.props.children);
    }
    return "";
  };

  const handleCopy = async () => {
    const code = extractCode(children);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const language = extractLanguage(className);

  return (
    <div className="relative group">
      {language && (
        <div className="absolute top-2 left-3 px-2 py-1 text-xs font-semibold text-blue-300 bg-blue-500/20 rounded-md z-10">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="text-green-400">✓ Copied</span>
        ) : (
          <span>Copy</span>
        )}
      </button>
      <pre className={className}>{children}</pre>
    </div>
  );
};
export default CodeBlock;