type Props = {
    title: string
    description: string
    imageUrl: string
    imageAlt: string
}

const Card = ({title, description, imageUrl, imageAlt}: Props) => {
    return <div className="transition duration-200 ease transform-gpu hover:scale-110
    max-w-xs min-w-0 rounded overflow-hidden shadow-lg my-2">
        <img className="w-full" src={imageUrl} alt={imageAlt}/>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">
                {description}
            </p>
        </div>
    </div>
}

export default Card;
