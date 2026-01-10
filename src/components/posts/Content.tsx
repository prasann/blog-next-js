import Engage from "./Engage";
import Post from "../../types/post";
import FooterCard from "./FooterCard";
import RenderMarkdown from "../RenderMarkdown";

const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-theme-accent-light bg-theme-bg-accent-light border border-theme-border-accent-light rounded-full">
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
                      {category.split(",").map((cat) => (
                        <CategoryTag key={cat} category={cat} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>
            <div className="prose prose-lg prose-invert max-w-none">
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