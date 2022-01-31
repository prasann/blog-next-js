import React from "react";
import Image from "next/image";
import profileImage from './../../public/assets/profile.jpg';

const About = () => {
    return <div className="content-area bg-white rounded-xl lg:max-w-screen-xl mx-12">
        <div className="inline-block animate-wave text-6xl origin-[70%_70%]">👋🏽</div>
        <span className="text-4xl font-bold mx-4">I'm Prasanna</span>
        <div className="my-4">
            Prasanna is a Software Architect with over 13 years of experience in building high-scale enterprise
            applications and retail solutions with agile and extreme programming practices. He has led digital
            transformation and legacy strangulation programs across various industries/sectors.
        </div>
        <div className="my-4">
            Prasanna is an acknowledged thought-leader on the subject of microservices and micro-frontends, and enjoys
            sharing his experiences when speaking at conferences.
        </div>
        <div className="mx-12 my-4 text-center">
            <Image
                src={profileImage}
                className="profile-image rounded-lg"
                width="256" height="256"
                objectFit="contain"
            />
        </div>
    </div>
}

export default About;
