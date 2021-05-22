const AboutMe = () => {
    return <div className="rounded shadow-xl h-64 p-4 w-full">
        Some text about me...
        Some text about me...
        Some text about me...
        Some text about me...
        Some text about me...
        Some text about me...
        Some text about me...
        Some text about me...

    </div>
}

const TalksAndBlogs = () => {
    return <div className="w-1/2 rounded shadow-xl p-4 h-32 border-4 mt-4">
        Talks & Blogs
    </div>
}

const Social = () => {
    return <div className="w-full rounded shadow-xl p-4 h-32 border-4 mt-4">
        Social
    </div>
}

const Container = () => {
    return <div className="p-6 -mt-20 mr-20 ml-20 bg-white shadow-xl rounded-xl flex flex-col items-center space-x-4">
        <AboutMe/>
        <div className="flex flex-row justify-between w-full">
            <TalksAndBlogs/>
            <TalksAndBlogs/>
        </div>
        <Social/>
    </div>
}

export default Container;