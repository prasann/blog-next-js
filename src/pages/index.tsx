import Post from "../types/post";
import ContentArea from "../components/landing/ContentArea";
import Header from "../components/Header";

type Props = {
    allPosts: Post[]
}

const Home = () => {
    return <div className="prose max-w-none">
        <Header/>
        <ContentArea/>
        <footer className="py-5 text-center">
            Hey. I'm a footer.
        </footer>
    </div>
}

export default Home;
