import Post from "../types/post";
import { getAllPosts } from "../lib/api";
import PostListItem from "../components/PostListItem";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";
import Meta from "../types/meta";

type Props = {
  allPosts: Post[];
};

const Blog = ({ allPosts }: Props) => {
  const metaDetails: Meta = {
    title: "Prasanna's - Blogposts",
    description: "lists of all the blog posts that i have done so far.",
  };
  return (
    <div>
      <MetaHeaders {...metaDetails} />
      <div className="prose max-w-screen-xl content-area bg-white rounded-xl">
        {allPosts.map((post) => (
          <PostListItem key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: { allPosts },
  };
};

export default Blog;
