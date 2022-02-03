import React from "react";

const About = () => {
    return <div className="content-area bg-white rounded-xl lg:max-w-screen-xl mx-12">
        <div className="inline-block animate-wave text-6xl origin-[70%_70%]">👋🏽</div>
        <span className="text-6xl font-bold mx-4">Hi, I'm Prasanna !!</span>
        <div className="my-6">
            I live in Bengaluru, India. Works as a Lead consultant <a href="https://thoughtworks.com:">@thoughtworks</a>
        </div>
        <div className="my-4">
            I'm a software architect with lots of experience in building high-scale enterprise
            applications and retail solutions with agile and extreme programming practices. I have led digital
            transformation and legacy strangulation programs across various industries/sectors.
        </div>
        <div className="my-4">
            I have done lots of presentation and talks on various tech topics. Please do check out them <a href="/talks"> here </a>
        </div>
        <div className="my-4">
            Happy to work on exciting things, you can reach me at <span className="font-bold text-twitter-blue"> mail@prasanna.dev</span>
        </div>
    </div>
}

export default About;
