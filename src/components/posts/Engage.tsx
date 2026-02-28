import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { event } from "../../lib/googleTag";
import confetti from "canvas-confetti";

type Props = {
  description: string;
};

const shareOnTwitter = (description: string) => {
  const url = window.location.href;
  window.open(
    `https://twitter.com/intent/tweet?text=${description}&url=${url}`
  );
};

const likeThePost = () => {
  celebrate();
  const postName = window.location.href.split("posts/")[1];
  const gTagEvent = {
    action: "post_likes",
    category: "LikeButton",
    label: postName,
    value: 1,
  };
  event(gTagEvent);
};

const celebrate = () => {
  confetti({
    particleCount: 400,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const Engage = ({ description }: Props) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        className="flex items-center gap-2 px-6 py-3 bg-theme-cyan/10 hover:bg-theme-cyan/20 border border-theme-border-cyan-light hover:border-theme-border-cyan-medium rounded-xl text-theme-cyan-light hover:text-theme-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-0.5"
        onClick={() => shareOnTwitter(description)}
      >
        <FontAwesomeIcon icon={faTwitter} className="text-lg" />
        Share
      </button>
      <button
        className="flex items-center gap-2 px-6 py-3 bg-theme-bg-pink-light hover:bg-theme-bg-pink-medium border border-pink-500/30 hover:border-pink-400/50 text-pink-300 hover:text-pink-200 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:-translate-y-0.5"
        onClick={likeThePost}
      >
        <FontAwesomeIcon icon={faHeart} className="text-lg" />
        Like
      </button>
    </div>
  );
};

export default Engage;
