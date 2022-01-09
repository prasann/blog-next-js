import Post from "../types/post";
import {useRouter} from "next/router";

const PostListItem = ({title, description, slug}: Post) => {
    const router = useRouter();

    function navigateTo(slug: string) {
        router.push(`posts/${slug}`).then(r => console.log("redirected"))
    }

    return <div key={slug}
                onClick={() => navigateTo(slug)} className="cursor-pointer m-2 py-4 border-b-2">
        <div className="my-2 text-sky-400 text-2xl">{title}</div>
        <div>{description}</div>
    </div>
}

export default PostListItem
