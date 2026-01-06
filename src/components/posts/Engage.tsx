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
    <div className="flex flex-row gap-2">
      <button
        className="btn btn-primary btn-sm gap-2"
        onClick={() => shareOnTwitter(description)}
      >
        <FontAwesomeIcon icon={faTwitter} />
        Share
      </button>
      <button
        className="btn btn-secondary btn-sm gap-2"
        onClick={likeThePost}
      >
        <FontAwesomeIcon icon={faHeart} />
        Like
      </button>
    </div>
  );
};

export default Engage;
