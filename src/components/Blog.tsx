import Post from "../types/post";

type Props = {
  entries: Post[];
};

const Blog = ({ entries }: Props) => {
  const listOfPosts = entries.map((post) => {
    const postUrl = `/posts/${post.slug}`;
    return (
      <a key={post.slug} href={postUrl}>
        {post.title}
      </a>
    );
  });
  return <>{listOfPosts}</>;
};

export default Blog;
