import logoImage from "./../../public/assets/logo.png"

type Meta = {
  title?: string;
  description?: string;
  image?: string;
  isArticle?: boolean;
};

export const defaultMeta: Meta = {
  title: "Random Presence",
  description: "Random presence of my thoughts and learning...",
  image: logoImage.src,
  isArticle: false,
};

export default Meta;
