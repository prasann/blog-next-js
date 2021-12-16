import Post from "../types/post";
import {getAllPosts} from "../lib/api";
import Header from "../components/Header";
import PostListItem from "../components/PostListItem";

type Props = {
    allPosts: Post[]
}

const Blog = ({allPosts}: Props) => {
    return <div className="prose max-w-none">
        <Header/>
        <div className="prose max-w-none mx-12 content-area bg-white rounded-xl">
            {allPosts.map(post => (<PostListItem {...post}/>))}
        </div>
    </div>
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        'title',
        'description',
        'date',
        'slug',
        'category'
    ])

    return {
        props: {allPosts},
    }
}

export default Blog;
