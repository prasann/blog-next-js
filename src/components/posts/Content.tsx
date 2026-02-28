import Engage from "./Engage";
import Post from "../../types/post";
import FooterCard from "./FooterCard";
import RenderMarkdown from "../RenderMarkdown";

const CategoryTag = ({ category, index }: { category: string, index?: number }) => {
  const isCyan = index !== undefined && index % 2 === 1;
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
      isCyan 
        ? 'text-theme-cyan-light bg-theme-cyan/10 border border-theme-border-cyan-light'
        : 'text-theme-accent-light bg-theme-bg-accent-light border border-theme-border-accent-light'
    }`}>
      {category}
    </span>
  );
};

const Content = ({
  title,
  description,
  content,
  date,
  minutesToRead,
  category,
}: Post) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-theme-glass-light backdrop-blur-lg border border-theme-border-medium rounded-3xl overflow-hidden">
        <div className="p-6 md:p-10">
          <article key={title} className="space-y-6">
            <header className="space-y-4 border-b border-theme-border-medium pb-6">
              <h1 className="text-3xl md:text-4xl font-bold gradient-heading">{title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-theme-text-muted">
                <time>{date}</time>
                <span>•</span>
                <span>{minutesToRead}</span>
                {category && (
                  <>
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {category.split(",").map((cat, idx) => (
                        <CategoryTag key={cat} category={cat} index={idx} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>
            <div className="prose prose-invert max-w-none">
              {/*@ts-ignore*/}
              <RenderMarkdown content={content} />
            </div>
          </article>
          <div className="mt-10 pt-8 border-t border-theme-border-medium">
            <Engage description={description} />
          </div>
          <div className="mt-8 pt-8 border-t border-theme-border-medium">
            <FooterCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;