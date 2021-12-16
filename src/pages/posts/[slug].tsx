import fs from "fs";
import matter from "gray-matter";
import Post from "../../types/post";
import PostComponent from "../../components/Post";

type Props = {
    posts: Post[]
}

export default function Home({posts}: Props) {
    return (
        <div>
            <header className="header dark-background"> Header</header>
            {posts.map(({title, description, content}) => (
                <PostComponent title={title}
                               description={description}
                               content={content}/>
            ))}
        </div>
    );
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
