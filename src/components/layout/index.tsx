import React, {FC} from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return <div className="prose max-w-none flex flex-col justify-start min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500">
        <Header/>
        <main className="">
            {children}
        </main>
        <Footer/>
    </div>
}

export default Layout;
