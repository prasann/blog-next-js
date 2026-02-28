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

  // Extract className from code element if it's in children
  const getCodeClassName = (): string | undefined => {
    if (className) return className;
    if (React.isValidElement(children) && children.props.className) {
      return children.props.className;
    }
    return undefined;
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

  const codeClassName = getCodeClassName();
  const language = extractLanguage(codeClassName);

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-theme-cyan/20 border border-white/10 hover:border-theme-cyan transition-all text-gray-300 hover:text-theme-cyan-light rounded-lg opacity-0 group-hover:opacity-100 z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="text-theme-cyan-light">✓ Copied</span>
        ) : (
          <span>Copy</span>
        )}
      </button>
      <pre className={codeClassName}>{children}</pre>
    </div>
  );
};
export default CodeBlock;