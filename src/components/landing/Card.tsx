import {useRouter} from "next/router";

type ColorKey = keyof typeof colors;

type Props = {
    title: string
    description: string
    color: ColorKey
    path: string
}

const colors = {
    variant1: "bg-gradient-to-bl from-gray-700 via-gray-900 to-black",
    variant3: "bg-gradient-to-br from-blue-gray-500 to-yellow-100",
    variant2: "bg-gradient-to-l from-sky-400 to-cyan-300",
    default: ""
}


const Card = ({title, description, color, path}: Props) => {
    const router = useRouter()
    function navigateTo(path: string) {
        router.push(path).then(r => console.log("Redirected"));
    }

    const bgColor: ColorKey = color;
    return <div onClick={() => navigateTo(path)}
                className={`cursor-pointer transition duration-200 ease transform-gpu hover:scale-110
    max-w-xs min-w-0 w-full rounded overflow-hidden shadow-lg ${colors[bgColor]}`}>
        <div className="p-16">
            <div className="font-bold text-sky-400 text-xl mb-2">{title}</div>
            <p className="text-sky-200 text-base">
                {description}
            </p>
        </div>
    </div>
}

export default Card;
