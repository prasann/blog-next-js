import {getAllPosts} from "../lib/api";
import Post from "../types/post";
import Posts from "../components/Posts";
import Bio from "../components/Bio";
import ContentArea from "../components/landing/ContentArea";

type Props = {
    allPosts: Post[]
}

const Home = ({allPosts}: Props) => {
    return <div className="flex flex-col h-screen bg-gradient-to-tr from-yellow-50 to-red-50">
        <header className="h-60 header-background"> Header</header>
        <div className="flex-1">
            <ContentArea/>
        </div>
        <footer className="py-5 text-center">
            Hey. I'm a footer.
        </footer>
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
