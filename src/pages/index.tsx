import {getAllPosts} from "../lib/api";
import Post from "../types/post";
import ContentArea from "../components/landing/ContentArea";

type Props = {
    allPosts: Post[]
}

const Home = ({allPosts}: Props) => {
    return <div className="prose">
        <header className="header dark-background"> Header</header>
        <ContentArea/>
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
