import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter();

    function navigateToHome() {
        return router.push(`/`)
    }

    return <header className="header dark-background">
        <h1 className="font-bold text-sky-400 text-2xl md:text-4xl mx-2 my-4 cursor-pointer" onClick={navigateToHome}>Prasanna's writings...</h1>
    </header>
}

export default Header;
