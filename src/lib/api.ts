import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import Post from "../types/post";

const postsDirectory = join(process.cwd(), 'content', '_posts')

export function getPostFileNames(): string[] {
    return fs.readdirSync(postsDirectory)
}

export function getPostByFileName(fileName: string, withContent: boolean = true): Post {
    const fullPath = join(postsDirectory, `${fileName}`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data, content} = matter(fileContents)
    const post: Post = <Post>{};
    post.slug = fileNameToSlug(fileName)
    post.title = data.title
    post.description = data.description
    post.date = data.date

    if (data.category) {
        post.category = data.category
    }
    if (withContent) {
        post.content = content
    }
    return post
}

export function getAllPosts(): Post[] {
    const fileNames = getPostFileNames();
    return fileNames
        .map((fileName) => getPostByFileName(fileName, false))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export function getAllUrlSlugs(): string[] {
    const fileNames = getPostFileNames()
    return fileNames.map(fileNameToSlug);
}

export function getPostBySlug(slug: string): Post {
    const fileNames = getPostFileNames();
    const currentFileName = fileNames.find(fileName => fileName.endsWith(`${slug}.md`))
    if (currentFileName === undefined) throw Error(`file not found ${slug}`)
    return getPostByFileName(currentFileName);
}

function fileNameToSlug(fileName: string): string {
    let regExMatcher = fileName.match(/.*--(.*).md/);
    if (regExMatcher === null) {
        throw Error(`unknown filename ${fileName}`);
    }
    return regExMatcher[1]
}
