type PostMeta = {
    slug: string
    title: string
    description: string
    date: string
}

interface Post extends PostMeta  {
    category?: string
    content: string
}

export default Post
