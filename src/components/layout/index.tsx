import React, {FC} from "react";
import Header from "./Header";
import Footer from "./Footer";
import MetaHeaders from "../MetaHeaders";

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return <div className="flex flex-col justify-start min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <Header/>
        <div className="flex justify-center">
            <main>
                {children}
            </main>
        </div>
        <Footer/>
    </div>
}

export default Layout;
