import {useRouter} from "next/router";
import Image from 'next/image';
import logoImage from './../../../public/assets/logo.png';

type MenuLinkProps = {
    displayName: string,
    location: string
}

const MenuLink = ({displayName, location}: MenuLinkProps) => {
    return <div className="p-2 text-sky-400 hover:text-green-500  hover:cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-xl"><a href={location}
              className="text-xl font-semibold transition duration-300">
        {displayName}</a></div>
}

const Header = () => {
    const router = useRouter();

    function navigateToHome() {
        return router.push(`/`)
    }

    return <header className="header dark-background ">
        <div className="flex flex-row justify-between">
            <div onClick={navigateToHome} className="cursor-pointer mx-4 my-2">
                <div className="mt-2 w-6/12 md:w-4/12 xl:w-3/12">
                    <Image src={logoImage} alt="logo"/>
                </div>
            </div>
            <div className="hidden md:mr-8 md:flex items-center space-x-2">
                <MenuLink displayName="About" location="/about"/>
                <MenuLink displayName="Talks" location="/talks"/>
                <MenuLink displayName="Blog" location="/blog"/>
            </div>
        </div>
    </header>
}

export default Header;
