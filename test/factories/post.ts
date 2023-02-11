import Post from "../../src/types/post";
import { define, random, sequence } from "cooky-cutter";

const post = define<Post>({
  slug: "blog-slug",
  title: "sample-title-for-the-post",
  date: "20-Jan-2021",
  description: "contains the subtitle",
  category: "tech",
  content: "<p>some content</p>",
  minutesToRead: "2",
});

export default post;
