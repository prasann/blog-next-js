import {useRouter} from "next/router";
import Image from 'next/image';
import logoImage from './../../../public/assets/logo.png';

const Header = () => {
    const router = useRouter();

    function navigateToHome() {
        return router.push(`/`)
    }

    return <header className="header dark-background ">
        <div onClick={navigateToHome} className="cursor-pointer mx-4 my-2">
            <div className="mt-2 w-7/12 md:w-3/12 xl:w-2/12">
                <Image src={logoImage} alt="logo" layout="responsive"/>
            </div>
        </div>
    </header>
}

export default Header;
