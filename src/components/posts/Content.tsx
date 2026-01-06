import Engage from "./Engage";
import Post from "../../types/post";
import FooterCard from "./FooterCard";
import RenderMarkdown from "../RenderMarkdown";

const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className="badge badge-primary badge-lg mr-1">
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
    <div className="prose prose-lg max-w-none content-area bg-base-100 text-base-content rounded-xl p-4 md:p-8">
      <article key={title} className="space-y-4">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-center greeting-color mb-4">{title}</h1>
          <div className="flex flex-row justify-between text-sm text-base-content/60 italic">
            <div>{date}</div>
            <div>{minutesToRead}</div>
          </div>
          <div className="text-center space-x-1">
            {category?.split(",").map((cat) => (
              <CategoryTag key={cat} category={cat} />
            ))}
          </div>
        </header>
        <div className="prose-headings:text-primary prose-h2:text-secondary prose-a:link prose-a:link-primary prose-strong:text-primary prose-code:text-secondary">
          {/*@ts-ignore*/}
          <RenderMarkdown content={content} />
        </div>
      </article>
      <div className="flex justify-center items-center my-8">
        <Engage description={description} />
      </div>
      <div className="divider"></div>
      <FooterCard />
    </div>
  );
};

export default Content;