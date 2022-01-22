import {useRouter} from "next/router";
import Image from 'next/image';

const Header = () => {
    const router = useRouter();

    function navigateToHome() {
        return router.push(`/`)
    }

    return <header className="header dark-background ">
        <div onClick={navigateToHome} className="cursor-pointer mx-4 my-2">
            <Image src="/assets/logo.png" alt="logo" width="276" height="92" />
        </div>
    </header>
}

export default Header;
