type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutesToRead: string;
};

interface Post extends PostMeta {
  tags: string[];
  content: string;
}

export default Post;
