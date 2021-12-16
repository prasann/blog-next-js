import ReactMarkdown from "react-markdown";
import CodeBlock from "./utils/CodeBlock";

type Props = {
    title: string,
    description: string,
    content: string,
}

const Post = ({title, description, content}: Props) => {
    return <div className="prose max-w-none mx-12 content-area bg-white rounded-xl">
            <article key={title}>
                <header>
                    <div className="text-4xl font-bold text-center mt-2 mb-10">{title}</div>
                </header>
                <section>
                    <p>{description}</p>
                </section>
                {/*@ts-ignore*/}
                <ReactMarkdown components={CodeBlock} children={content}/>
            </article>
    </div>
}

export default Post;
