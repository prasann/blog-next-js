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
    <div className="prose max-w-screen-xl content-area bg-gray-900 text-gray-300 rounded-xl">
      <article key={title}>
        <header>
          <div className="text-4xl font-bold text-center mt-2 greeting-color">{title}</div>
          <div className="flex flex-row justify-between">
            <div className="mt-2 mb-4 text-center text-gray-400 italic">
              {date}
            </div>
            <div className="mt-2 mb-4 text-center text-gray-400 italic">
              {minutesToRead}
            </div>
          </div>
          <div className="text-center">
            {category?.split(",").map((cat) => (
              <CategoryTag key={cat} category={cat} />
            ))}
          </div>
        </header>
        {/*@ts-ignore*/}
        <RenderMarkdown content={content} />
      </article>
      <div className="flex justify-center items-center">
        <Engage description={description} />
      </div>
      <div className="divider"></div>
      <FooterCard />
    </div>
  );
};

export default Content;