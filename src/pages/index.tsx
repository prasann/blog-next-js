import {getAllPosts} from "../lib/api";
import Post from "../types/post";
import Posts from "../components/Posts";
import Bio from "../components/Bio";

type Props = {
    allPosts: Post[]
}

const Home = ({allPosts}: Props) => {
    return <div>
        <Bio/>
        <Posts entries={allPosts}/>
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