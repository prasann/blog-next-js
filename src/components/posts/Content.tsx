import ReactMarkdown from "react-markdown";
import CustomComponentsForMarkdown from "../utils/CustomComponentsForMarkdown";
import Engage from "./Engage";
import Post from "../../types/post";
import FooterCard from "./FooterCard";
import RenderMarkdown from "../RenderMarkdown";

const Content = ({title, description, content, date}: Post) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    const formattedDate = new Date(date).toLocaleDateString(undefined, options) ;

    return <div className="prose max-w-none mx-12 content-area bg-white rounded-xl">
        <article key={title}>
            <header>
                <div className="text-4xl font-bold text-center mt-2">{title}</div>
                <div className="mt-2 mb-4 text-center text-gray-400 italic">{formattedDate}</div>
            </header>
            {/*@ts-ignore*/}
            <RenderMarkdown content={content}/>
        </article>
        <div className="flex justify-center items-center">
            <Engage description={description}/>
        </div>
        <div className="flex-grow border-t mx-4 md:mx-24 border-gray-300 mt-4"/>
        <FooterCard/>
    </div>
}

export default Content;
