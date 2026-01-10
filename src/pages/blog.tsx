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
    <div className="min-h-screen py-12">
      <MetaHeaders {...metaDetails} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-heading pb-2 leading-tight">
            Blog Posts
          </h1>
          <p className="text-lg text-gray-400">Thoughts on software development, architecture, and technology</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allPosts.map((post) => (
            <PostListItem key={post.title} {...post} />
          ))}
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
