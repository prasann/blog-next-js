import Post from "../../types/post";
import {getAllPosts, getPostBySlug} from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
    post: Post
}

const BlogPost = ({post}: Props) => {
    return <div className="dark-background">
        <article className="container mx-auto bg-gray-50 light-background">
        <div className="p-2">
            <div className="text-center font-bold text-4xl p-8 text-red-700">
                {post.title}
            </div>
            <div className="post-content">
                <div
                    dangerouslySetInnerHTML={{__html: post.content}}
                />
            </div>
        </div>
    </article></div>
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
        'description',
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
