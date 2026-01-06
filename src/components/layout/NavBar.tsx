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
    <a
      href={location}
      className="btn btn-ghost text-xl menu-links"
    >
      {displayName}
    </a>
  );
};

const MobileNavIcon = ({ iconName, displayName, location }: MobileNavProps) => {
  return (
    <a
      href={location}
      className="btn btn-ghost flex-col w-full menu-link"
    >
      <FontAwesomeIcon icon={iconName} className="text-lg" />
      <span className="text-xs">{displayName}</span>
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
      <div className="navbar bg-base-100 main-gradient">
        <div className="navbar-start">
          <div onClick={navigateToHome} className="btn btn-ghost">
            <Image
              src={logoImage}
              alt="Logo"
              width={72}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="navbar-end hidden md:flex">
          <div className="flex gap-2">
            <MenuLink displayName="About" location="/" />
            <MenuLink displayName="Talks" location="/talks" />
            <MenuLink displayName="Blog" location="/blog" />
          </div>
        </div>
      </div>
      <div className="btm-nav md:hidden main-gradient">
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
    </nav>
  );
};

export default NavBar;