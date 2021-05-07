import {getAllPosts} from "../lib/api";
import PostType from "../types/post";

type Props = {
    allPosts: PostType[]
}

const Home = ({ allPosts }: Props) => {
    console.log("App", allPosts)
    return allPosts.map(post => {
        const postUrl = `/posts/${post.slug}`
        return <a href={postUrl}>{post.title}</a>
    })
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'subTitle',
        'category'
    ])

    return {
        props: { allPosts },
    }
}

export default Home;