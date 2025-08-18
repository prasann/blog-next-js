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
      className="cursor-pointer m-1 p-2 theme-border border-b-2 hover:theme-bg-tertiary"
    >
      <div className="text-center md:text-left my-2 theme-link text-2xl theme-accent-hover">
        {title}
      </div>
      <div className="flex flex-row justify-between">
        <div className="theme-text-muted italic text-sm">{date}</div>
        <div className="theme-text-muted italic text-sm">{minutesToRead}</div>
      </div>
      <div className="theme-text-secondary">{description}</div>
    </div>
  );
};

export default PostListItem;