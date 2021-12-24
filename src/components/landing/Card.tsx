import {useRouter} from "next/router";

type ColorKey = keyof typeof colors;

type Props = {
    title: string
    description: string
    color: ColorKey
    path: string
}

const colors = {
    variant1: "bg-gradient-to-r from-sky-400 to-blue-500",
    variant2: "bg-gradient-to-r from-sky-400 to-cyan-300",
    variant3: "bg-gradient-to-r from-blue-500 to-blue-600",
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
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">
                {description}
            </p>
        </div>
    </div>
}

export default Card;
