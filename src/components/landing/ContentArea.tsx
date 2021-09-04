import FeaturedTalks from "./FeaturedTalks";
import FeaturedPosts from "./FeaturedPosts";

const AboutMe = () => {
    return <div className="rounded shadow-xl p-4 w-full">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
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
            <div className="flex flex-wrap justify-evenly w-full rounded p-4 mt-4">
                <FeaturedTalks/>
            </div>
            <div className="flex flex-wrap justify-evenly w-full rounded p-4 mt-4">
                <FeaturedPosts/>
            </div>
        </div>
        <Social/>
    </div>
}

export default Container;
