import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import Post from "../types/post";
import parse from "date-fns/parse"
import format from "date-fns/format"
import {compareDesc} from "date-fns";

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
    post.date = formattedDateString(data.date)

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
        .sort(sortDesc)
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

function formattedDateString(date: string): string {
    return format(formatStringToDate(date), 'dd-MMMM-yyyy')
}

function sortDesc(leftPost: Post, rightPost: Post): number {
    const leftPostDate = formatStringToDate(leftPost.date, 'dd-MMMM-yyyy')
    const rightPostDate = formatStringToDate(rightPost.date, 'dd-MMMM-yyyy')
    return compareDesc(leftPostDate, rightPostDate);
}

function formatStringToDate(date: string, format: string = 'dd-MM-yyyy'): Date {
    return parse(date, format, new Date());
}
