import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";

type Props = {
    data: string
    content: string
}


const About = ({data, content}: Props) => {
    return <div>
        <MetaHeaders/>
        <div className="m-2 content-area bg-white">
            <div className="inline-block animate-wave text-6xl origin-[70%_70%]">👋🏽</div>
            <div className="prose max-w-none">
                <ReactMarkdown children={content}/>
            </div>
        </div>
    </div>
}

export async function getStaticProps() {
    const markdownWithMetadata = fs
        .readFileSync(`content/_meta/about-me.md`)
        .toString();
    const {data, content} = matter(markdownWithMetadata);
    return {props: {data, content}};
}

export default About;

