import { useRouter } from "next/router";
import Image from "next/image";
import logoImage from "./../../../public/assets/logo.png";
import {
  faAddressCard,
  faBookOpen,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type MenuLinkProps = {
  displayName: string;
  location: string;
};

type MobileNavProps = {
  iconName: IconProp;
  displayName: string;
  location: string;
};

const MenuLink = ({ displayName, location }: MenuLinkProps) => {
  return (
    <div className="p-4 menu-links hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset  rounded-xl">
      <a
        href={location}
        className="text-2xl font-semibold transition duration-300"
      >
        {displayName}
      </a>
    </div>
  );
};

const MobileNavIcon = ({ iconName, displayName, location }: MobileNavProps) => {
  return (
    <a
      href={location}
      className="w-full menu-link justify-center inline-block text-center pt-2 pb-1"
    >
      <FontAwesomeIcon icon={iconName} />
      <span className="tab tab-home block text-xs">{displayName}</span>
    </a>
  );
};

const NavBar = () => {
  const router = useRouter();

  function navigateToHome() {
    return router.push(`/`);
  }

  return (
    <nav>
      <header className="header">
        <div className="flex flex-row justify-between">
          <div onClick={navigateToHome} className="cursor-pointer mx-2 my-2">
          <Image
            src={logoImage}
            alt="Logo"
            width={72}
            className="p-4 w-full h-auto"
          />
          </div>
          <div className="hidden md:mr-8 md:flex items-center space-x-2">
            <MenuLink displayName="About" location="/" />
            <MenuLink displayName="Talks" location="/talks" />
            <MenuLink displayName="Blog" location="/blog" />
          </div>
        </div>
      </header>
      <section className="block fixed md:hidden inset-x-0 bottom-0 z-10 shadow main-gradient">
        <div id="tabs" className="flex justify-between">
          <MobileNavIcon
            iconName={faAddressCard}
            displayName="About"
            location="/"
          />
          <MobileNavIcon
            iconName={faBookOpen}
            displayName="Blog"
            location="/blog"
          />
          <MobileNavIcon
            iconName={faVolumeUp}
            displayName="Talks"
            location="/talks"
          />
        </div>
      </section>
    </nav>
  );
};

export default NavBar;