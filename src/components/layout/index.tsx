import React, {FC} from "react";
import Header from "./Header";

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return <div className="prose max-w-none">
        <Header/>
        {children}
    </div>
}

export default Layout;
