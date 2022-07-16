import { useRouter } from "next/router";
import Image from 'next/image'
import blogImage from './../../images/blog.jpg';
import speakImage from './../../images/speak.jpg';

type Props = {
    title: string
    description: string
    path: string
}

const Card = ({ title, description, path }: Props) => {
    const router = useRouter()

    function navigateTo(path: string) {
        router.push(path);
    }

    return <div className="flex">
        <div className="w-1/2 highlight-animation text-center mr-4 p-2" onClick={() => navigateTo("/blog")}>
            <Image alt="link to blogs" className="rounded" src={blogImage} width="160" height="160" />
            <div className="font-bold text-2xl">Blog</div>
        </div>
        <div className="w-1/2 highlight-animation text-center ml-4" onClick={() => navigateTo("/talks")}>
            <Image alt="link to talks" className="rounded" src={speakImage} width="160" height="160" />
            <div className="font-bold text-2xl">Talks</div>
        </div></div>
}

export default Card;
