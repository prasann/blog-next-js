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
      <div className="flex justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-2 text-gray-100">Blog Posts</h1>
          <p className="text-gray-400 mb-10">Thoughts on software development, architecture, and technology</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allPosts.map((post) => (
              <PostListItem key={post.title} {...post} />
            ))}
          </div>
        </div>
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
