import fs from "fs";
import matter from "gray-matter";
import Post from "../../types/post";
import PostComponent from "../../components/posts/Content";
import {useRouter} from "next/router";
import ReactMarkdown from "react-markdown";
import Engage from "../../components/posts/Engage";
import FooterCard from "../../components/posts/FooterCard";

type Props = {
    posts: Post[]
    footer: string
}

export default function Home({posts}: Props) {
    const router = useRouter()
    const {slug} = router.query
    const currentPost = posts.find(post => post.slug === slug)

    if (currentPost) {
        return (
            <div>
                <div className="flex flex-row">
                    <PostComponent {...currentPost}/>
                </div>
                <FooterCard/>
            </div>
        );
    }
}

export async function getStaticPaths() {
    const files = fs.readdirSync("content/_posts");
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(".md", ""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps() {
    const files = fs.readdirSync(`${process.cwd()}/content/_posts`);

    const posts = files.map((filename) => {
        const markdownWithMetadata = fs
            .readFileSync(`content/_posts/${filename}`)
            .toString();

        const {data, content} = matter(markdownWithMetadata);

        return {
            slug: filename.replace(".md", ""),
            ...data,
            content
        };
    });

    return {
        props: {
            posts,
        },
    };

}
