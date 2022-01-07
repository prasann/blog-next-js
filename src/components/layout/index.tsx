import React, {FC} from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return <div className="prose max-w-none flex flex-col justify-start min-h-screen">
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
    </div>
}

export default Layout;
