import Post from "../types/post";
import { getAllPosts } from "../lib/api";
import { getTagCounts, getYearCounts } from "../lib/timeline";
import PostListItem from "../components/PostListItem";
import MetaHeaders from "../components/MetaHeaders";
import TimelineShell from "../components/timeline/TimelineShell";
import React from "react";
import Meta from "../types/meta";

type Props = {
  allPosts: Post[];
  tagCounts: Record<string, number>;
  yearCounts: Record<number, number>;
};

const Blog = ({ allPosts, tagCounts, yearCounts }: Props) => {
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
          <p className="text-lg text-theme-text-muted">Thoughts on software development, architecture, and technology</p>
        </div>
        <TimelineShell
          items={allPosts}
          tagCounts={tagCounts}
          yearCounts={yearCounts}
          itemLabel="posts"
          itemKey={(post) => post.slug}
          renderCard={(post) => <PostListItem {...post} />}
        />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts,
      tagCounts: getTagCounts(allPosts),
      yearCounts: getYearCounts(allPosts),
    },
  };
};

export default Blog;
