import Post from "../../types/post";
import {getAllPosts, getPostBySlug} from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
    post: Post
}

const BlogPost = ({post}: Props) => {
    return <div className="bg-black text-gray-300"><article className="container mx-auto">
        <div className="p-4">
            <div className="text-center font-bold text-2xl p-16">
                {post.title}
            </div>
            <div className="sample1">
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
