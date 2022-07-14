import {useRouter} from "next/router";
import Image from 'next/image';
import logoImage from './../../../public/assets/logo.png';
import {faAddressCard, faBookOpen, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type MenuLinkProps = {
    displayName: string,
    location: string
}

type MobileNavProps = {
    iconName: IconProp,
    displayName: string,
    location: string
}

const MenuLink = ({displayName, location}: MenuLinkProps) => {
    return <div
        className="p-2 text-sky-400 hover:text-green-500  hover:cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-xl">
        <a href={location}
           className="text-xl font-semibold transition duration-300">
            {displayName}</a></div>
}

const MobileNavIcon = ({iconName, displayName, location}: MobileNavProps) => {
    return <a href={location}
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <FontAwesomeIcon icon={iconName}/>
        <span className="tab tab-home block text-xs">{displayName}</span>
    </a>
}

const NavBar = () => {
    const router = useRouter();

    function navigateToHome() {
        return router.push(`/`)
    }

    return <nav>
        <header className="header dark-background ">
            <div className="flex flex-row justify-between">
                <div onClick={navigateToHome} className="cursor-pointer mx-4 my-2">
                    <div className="mt-2 w-6/12 md:w-4/12 xl:w-3/12">
                        <Image src={logoImage} alt="logo"/>
                    </div>
                </div>
                <div className="hidden md:mr-8 md:flex items-center space-x-2">
                    <MenuLink displayName="About" location="/"/>
                    <MenuLink displayName="Talks" location="/talks"/>
                    <MenuLink displayName="Blog" location="/blog"/>
                </div>
            </div>
        </header>
        <section className="block fixed md:hidden inset-x-0 bottom-0 z-10 bg-white border-t-2 border-gray-400 shadow">
            <div id="tabs" className="flex justify-between">
                <MobileNavIcon iconName={faAddressCard} displayName="About" location="/"/>
                <MobileNavIcon iconName={faBookOpen} displayName="Blog" location="/blog"/>
                <MobileNavIcon iconName={faVolumeUp} displayName="Talks" location="/talks"/>
            </div>
        </section>
    </nav>

}

export default NavBar;
