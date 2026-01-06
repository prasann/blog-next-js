import { useRouter } from "next/router";
import Image from "next/image";
import logoImage from "./../../../public/assets/logo.png";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [theme, setTheme] = useState("prasanna");

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "prasanna" ? "winter" : "prasanna";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar bg-base-200 border-b border-base-300 shadow-lg">
      <div className="navbar-start">
        <button onClick={() => router.push('/')} className="btn btn-ghost normal-case">
          <Image
            src={logoImage}
            alt="Prasanna Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </button>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/">About</a></li>
          <li><a href="/talks">Talks</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div className="navbar-end flex gap-2">
        <button 
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "prasanna" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              <li><a href="/">About</a></li>
              <li><a href="/talks">Talks</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;