import { Feed, Item } from 'feed';

const baseUrl = "https://prasanna.dev";

const buildFeed = (): Feed => {
    return new Feed({
        title: 'Random Presence',
        description: 'Random presence of my thoughts and learning...',
        id: baseUrl,
        link: baseUrl,
        language: 'en',
        image: `${baseUrl}/images/banner.png`,
        favicon: `${baseUrl}/favicons/banner.png`,
        copyright: "Copyright - Prasanna",
        generator: 'npm feed package',
        feedLinks: {
            json: `${baseUrl}/feeds/feed.json`,
            atom: `${baseUrl}/feeds/atom.xml`,
            rss2: `${baseUrl}/feeds/feed.xml`,
        },
        author: {
            name: 'Prasanna Venkatesan',
            email: 'mail@prasanna.dev',
            link: baseUrl,
        },
    });
};
