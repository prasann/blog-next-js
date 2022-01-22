type Meta = {
    title?: string,
    description?: string,
    image?: string,
    isArticle?: boolean
}

export const defaultMeta: Meta = {
    title: "Random Presence",
    description: "Random presence of my thoughts and learning...",
    image: "/assets/images/profile.jpg",
    isArticle: false
}

export default Meta
