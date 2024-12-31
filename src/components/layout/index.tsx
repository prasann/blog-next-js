import React, { FC } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <NavBar />
      <main className="prose max-w-none main-bg">
        <div className="lg:flex lg:justify-center">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;