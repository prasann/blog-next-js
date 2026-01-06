import Post from "../types/post";
import { useRouter } from "next/router";

const PostListItem = ({
  title,
  description,
  slug,
  date,
  minutesToRead,
}: Post) => {
  const router = useRouter();

  function navigateTo(slug: string) {
    router.push(`posts/${slug}`);
  }

  return (
    <div
      key={slug}
      onClick={() => navigateTo(slug)}
      className="card card-compact bg-base-100 border-b-2 border-base-300 hover:bg-base-200 cursor-pointer transition-colors"
    >
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent hover:from-primary hover:via-primary hover:to-primary justify-center md:justify-start">
          {title}
        </h2>
        <div className="flex flex-row justify-between text-sm text-base-content/60 italic">
          <div>{date}</div>
          <div>{minutesToRead}</div>
        </div>
        <p className="text-base-content/80">{description}</p>
      </div>
    </div>
  );
};

export default PostListItem;