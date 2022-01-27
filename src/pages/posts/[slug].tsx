import Post from "../../types/post";
import PostComponent from "../../components/posts/Content";
import MetaHeaders from "../../components/MetaHeaders";
import React from "react";
import Meta from "../../types/meta";
import {getAllUrlSlugs, getPostBySlug} from "../../lib/api";
import {ParsedUrlQuery} from 'querystring'

type Props = {
    post: Post
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export default function Home({post}: Props) {
    if (post) {
        const metaDetails: Meta = {
            title: post.title,
            description: post.description
        }
        return (
            <>
                <MetaHeaders {...metaDetails}/>
                <PostComponent {...post}/>
            </>
        );
    }
}

export async function getStaticPaths() {
    const slugs = getAllUrlSlugs();
    const paths = slugs.map((slug) => ({
        params: {slug},
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context: { params: IParams; }) {
    const {slug} = context.params as IParams;
    return {
        props: {
            post: {
                ...(getPostBySlug(slug)),
            },
        },
    }
}
