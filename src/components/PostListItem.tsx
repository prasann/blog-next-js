import Post from "../types/post";
import { useRouter } from "next/router";

const PostListItem = ({
  title,
  description,
  slug,
  date,
  minutesToRead,
  tags,
}: Post) => {
  const router = useRouter();

  function navigateTo(slug: string) {
    router.push(`posts/${slug}`);
  }

  return (
    <div
      key={slug}
      onClick={() => navigateTo(slug)}
      className="group card bg-base-200/30 hover:bg-base-200/60 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 border border-theme-border-light hover:border-theme-border-cyan-light backdrop-blur-xs rounded-2xl h-full"
    >
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-semibold mb-2 gradient-heading group-hover:from-cyan-300 group-hover:via-cyan-400 group-hover:to-cyan-500 transition-all">
          {title}
        </h2>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium rounded-full bg-theme-bg-accent-light text-theme-accent-light border border-theme-border-accent-light group-hover:border-theme-border-accent-dark transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-theme-text-secondary flex-grow line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex flex-row justify-between items-center text-sm text-theme-text-muted pt-4 border-t border-theme-border-light">
          <time>{date}</time>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {minutesToRead}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
