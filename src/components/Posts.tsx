import Post from "../types/post";

type Props = {
    entries: Post[]
}

const Posts = ({entries}: Props) => {
    const listOfBlogs = entries.map(post => {
        const postUrl = `/posts/${post.slug}`
        return <a key={post.slug} href={postUrl}>{post.title}</a>
    });
    return <>
        {listOfBlogs}
    </>

}

export default Posts;