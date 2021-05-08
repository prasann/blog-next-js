import Head from 'next/head'
import Post from "../../types/post";
import {getAllPosts, getPostBySlug} from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
    post: Post
}

const BlogPost = ({post}: Props) => {
    return <article>
        <Head>
            {post.title}
        </Head>
        <div>
            <div
                dangerouslySetInnerHTML={{__html: post.content}}
            />
        </div>
    </article>
}

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'content',
        'subTitle',
        'category'
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((posts) => {
            return {
                params: {
                    slug: posts.slug,
                },
            }
        }),
        fallback: false,
    }
}

export default BlogPost;