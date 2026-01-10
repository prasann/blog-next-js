import Engage from "./Engage";
import Post from "../../types/post";
import FooterCard from "./FooterCard";
import RenderMarkdown from "../RenderMarkdown";

const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full">
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
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 md:p-10">
          <article key={title} className="space-y-6">
            <header className="space-y-4 border-b border-white/10 pb-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">{title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
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
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:text-gray-100 prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:text-gray-200 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-gray-100 prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-transparent prose-pre:p-0">
              {/*@ts-ignore*/}
              <RenderMarkdown content={content} />
            </div>
          </article>
          <div className="mt-10 pt-8 border-t border-white/10">
            <Engage description={description} />
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <FooterCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;