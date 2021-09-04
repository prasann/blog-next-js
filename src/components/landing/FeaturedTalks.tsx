import Card from "./Card";

const talkArray = [
    {
        title: "Talk 1",
        description: "Description of the talk 1",
        imageUrl: "https://tailwindcss.com/img/card-top.jpg",
        imageAlt: "Sunset in the mountains"
    },
    {
        title: "Talk 2",
        description: "Description of the talk 2",
        imageUrl: "https://tailwindcss.com/img/card-top.jpg",
        imageAlt: "Sunset in the mountains"
    },
    {
        title: "Talk 3",
        description: "Description of the talk 3",
        imageUrl: "https://tailwindcss.com/img/card-top.jpg",
        imageAlt: "Sunset in the mountains"
    }
]

const FeaturedTalks = () => {
    return <>
        {talkArray.map(talk => <Card title={talk.title}
                                     description={talk.description} imageUrl={talk.imageUrl} imageAlt={talk.imageAlt}/>)}
    </>
}

export default FeaturedTalks;
