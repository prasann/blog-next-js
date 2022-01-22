import Post from "../types/post";
import {getAllPosts} from "../lib/api";
import PostListItem from "../components/PostListItem";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";

type Props = {
    allPosts: Post[]
}

const Blog = ({allPosts}: Props) => {
    return <div>        <MetaHeaders/>
        <div className="prose max-w-none content-area bg-white rounded-xl">
            {allPosts.map(post => (<PostListItem key={post.title} {...post}/>))}
        </div></div>
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        'title',
        'description',
        'date',
        'slug',
        'category'
    ])

    return {
        props: {allPosts},
    }
}

export default Blog;
