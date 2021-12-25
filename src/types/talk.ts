type ExternalLink = {
    name: string
    link: string
}

type Talk = {
    title: string
    date: string
    place: string
    description: string
    externalLinks: ExternalLink[]
}

export default Talk
