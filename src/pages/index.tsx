import Post from "../types/post";
import ContentArea from "../components/landing/ContentArea";

type Props = {
    allPosts: Post[]
}

const Home = () => {
    return <div>
        <ContentArea/>
    </div>
}

export default Home;
