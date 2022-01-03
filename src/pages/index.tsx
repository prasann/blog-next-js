import Post from "../types/post";
import ContentArea from "../components/landing/ContentArea";

type Props = {
    allPosts: Post[]
}

const Home = () => {
    return <div>
        <ContentArea/>
        <footer className="py-5 text-center">
            Hey. I'm a footer.
        </footer>
    </div>
}

export default Home;
