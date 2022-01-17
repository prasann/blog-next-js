import ReactMarkdown from "react-markdown";
import CodeBlock from "../utils/CodeBlock";
import Engage from "./Engage";
import Post from "../../types/post";

const Content = ({title, description, content, date}: Post) => {
    return <div className="prose max-w-none mx-12 content-area bg-white rounded-xl">
            <article key={title}>
                <header>
                    <div className="text-4xl font-bold text-center mt-2">{title}</div>
                    <div className="flex flex-row justify-between">
                        <Engage/>
                        <div className="my-8 text-right text-gray-500 font-bold italic">{date}</div>
                    </div>
                </header>
                {/*@ts-ignore*/}
                <ReactMarkdown components={CodeBlock} children={content}/>
            </article>
    </div>
}

export default Content;
