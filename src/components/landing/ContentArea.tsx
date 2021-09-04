import Talks from "./Talks";

const AboutMe = () => {
    return <div className="rounded shadow-xl p-4 w-full">
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
    return <div className="flex flex-wrap justify-evenly w-full rounded p-4 mt-4">
        <Talks/>
        <Talks/>
    </div>
}

const Social = () => {
    return <div className="w-full rounded shadow-xl p-4 h-32 border-4 mt-4">
        Social
    </div>
}

const Container = () => {
    return <div className="content-area bg-white shadow-xl rounded-xl">
        <AboutMe/>
        <div className="w-full">
            <TalksAndBlogs/>
            <TalksAndBlogs/>
        </div>
        <Social/>
    </div>
}

export default Container;
