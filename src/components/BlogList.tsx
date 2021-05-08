import Post from "../types/post";

type Props = {
    allPosts: Post[]
}

const BlogList = ({allPosts}: Props) => {
    const listOfBlogs = allPosts.map(post => {
        const postUrl = `/posts/${post.slug}`
        return <a key={post.slug} href={postUrl}>{post.title}</a>
    });
    return <>
        {listOfBlogs}
    </>

}

export default BlogList;