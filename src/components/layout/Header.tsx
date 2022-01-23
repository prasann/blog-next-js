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
            <div className="w-7/12 md:w-4/12 xl:w-2/12">
                <Image src={logoImage} alt="logo" layout="responsive" objectFit="cover" />
            </div>
        </div>
    </header>
}

export default Header;
