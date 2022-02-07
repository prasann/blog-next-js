import Post from "../types/post";
import {useRouter} from "next/router";

const PostListItem = ({title, description, slug, date, minutesToRead}: Post) => {
    const router = useRouter();

    function navigateTo(slug: string) {
        router.push(`posts/${slug}`)
    }

    return <div key={slug}
                onClick={() => navigateTo(slug)} className="cursor-pointer m-1 p-2 border-b-2 hover:bg-gray-100">
        <div className="text-center md:text-left my-2 text-sky-400 text-2xl hover:text-green-500">{title}</div>
        <div className="flex flex-row justify-between">
            <div className="text-gray-500 italic text-sm">{date}</div>
            <div className="text-gray-500 italic text-sm">{minutesToRead}</div>
        </div>
        <div>{description}</div>
    </div>
}

export default PostListItem
