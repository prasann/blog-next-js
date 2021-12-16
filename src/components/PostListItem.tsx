import Post from "../types/post";

const PostListItem = ({title, description}: Post) => {
    return <div className="m-2 py-4 border-b-2">
        <div className="my-2 text-sky-400 text-2xl">{title}</div>
        <div>{description}</div>
    </div>
}

export default PostListItem
