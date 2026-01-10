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
      className="group card bg-base-200/30 hover:bg-base-200/60 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 border border-white/5 backdrop-blur-sm rounded-2xl"
    
    >
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-semibold mb-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-blue-500 transition-all">
          {title}
        </h2>
        <p className="text-gray-300 flex-grow line-clamp-3 mb-4">{description}</p>
        <div className="flex flex-row justify-between items-center text-sm text-gray-400 pt-4 border-t border-white/5">
          <time>{date}</time>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {minutesToRead}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;