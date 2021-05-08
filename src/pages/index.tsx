import {getAllPosts} from "../lib/api";
import Post from "../types/post";
import BlogList from "../components/BlogList";
import SideBar from "../components/SideBar";

type Props = {
    allPosts: Post[]
}

const Home = ({allPosts}: Props) => {
    return <div>
        <SideBar/>
        <BlogList allPosts={allPosts}/>
    </div>
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
        props: {allPosts},
    }
}

export default Home;