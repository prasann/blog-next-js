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
    <div className="flex flex-wrap justify-center gap-4">
      <button
        className="group flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border-2 border-theme-cyan/40 hover:border-theme-cyan rounded-xl text-theme-cyan-light hover:text-white font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 backdrop-blur-sm"
        onClick={() => shareOnTwitter(description)}
      >
        <FontAwesomeIcon icon={faTwitter} className="text-xl group-hover:scale-110 transition-transform" />
        <span>Share on Twitter</span>
      </button>
      <button
        className="group flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border-2 border-pink-500/40 hover:border-pink-400 text-pink-300 hover:text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-105 backdrop-blur-sm"
        onClick={likeThePost}
      >
        <FontAwesomeIcon icon={faHeart} className="text-xl group-hover:scale-110 transition-transform" />
        <span>Like this Post</span>
      </button>
    </div>
  );
};

export default Engage;
