import Card from "./Card";

const postsArray = [
    {
        title: "Blog 1",
        description: "Description of the blog 1",
        imageUrl: "https://tailwindcss.com/img/card-top.jpg",
        imageAlt: "Sunset in the mountains"
    },
    {
        title: "Blog 2",
        description: "Description of the blog 2",
        imageUrl: "https://tailwindcss.com/img/card-top.jpg",
        imageAlt: "Sunset in the mountains"
    },
    {
        title: "Blog 3",
        description: "Description of the blog 3",
        imageUrl: "https://tailwindcss.com/img/card-top.jpg",
        imageAlt: "Sunset in the mountains"
    }
]

const FeaturedPosts = () => {
    return <>
        {postsArray.map(blog => <Card title={blog.title}
                                     description={blog.description} imageUrl={blog.imageUrl} imageAlt={blog.imageAlt}/>)}
    </>
}

export default FeaturedPosts;
