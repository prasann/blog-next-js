import { useRouter } from "next/router";
import Image from "next/image";
import logoImage from "./../../../public/assets/logo.png";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "prasanna";
    const newTheme = currentTheme === "prasanna" ? "winter" : "prasanna";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src={logoImage}
              alt="Prasanna Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-100 hover:text-blue-400 transition-colors font-medium">
              About
            </a>
            <a href="/talks" className="text-gray-100 hover:text-purple-400 transition-colors font-medium">
              Talks
            </a>
            <a href="/blog" className="text-gray-100 hover:text-cyan-400 transition-colors font-medium">
              Blog
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm text-gray-100 hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52">
                <li><a href="/" className="text-gray-100 hover:text-blue-400">About</a></li>
                <li><a href="/talks" className="text-gray-100 hover:text-purple-400">Talks</a></li>
                <li><a href="/blog" className="text-gray-100 hover:text-cyan-400">Blog</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;