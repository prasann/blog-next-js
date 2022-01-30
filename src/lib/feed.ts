import {Feed, Item} from 'feed';
import fs from "fs";
import {getAllPosts, getAllUrlSlugs, getPostBySlug} from "./api";
import Post from "../types/post";
import parse from "date-fns/parse";

const baseUrl = "https://prasanna.dev";

function buildFeed(): Feed {
    return new Feed({
        title: 'Random Presence',
        description: 'Random presence of my thoughts and learning...',
        id: baseUrl,
        link: baseUrl,
        language: 'en',
        image: `${baseUrl}/assets/logo.png`,
        favicon: `${baseUrl}/assets/favicons/favicon-32x32.png`,
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
}

function formatStringToDate(date: string, format: string = 'dd-MMMM-yyyy'): Date {
    return parse(date, format, new Date());
}

function makeItem(postData: Post): Item {
    const url = `${baseUrl}/posts/${postData.slug}`
    return {
        title: postData.title,
        link: url,
        id: url,
        date: formatStringToDate(postData.date),
        description: postData.description,
        content: postData.content,
    };
}

const generateMainFeeds = async (): Promise<void> => {
    const feed = buildFeed();
    let allPosts = getAllPosts(true);
    allPosts.map(post => feed.addItem(makeItem(post)))

    fs.writeFileSync('public/feed.xml', feed.rss2());
    fs.writeFileSync('public/feed.json', feed.json1());
    fs.writeFileSync('public/atom.xml', feed.atom1());
}

export default generateMainFeeds;
