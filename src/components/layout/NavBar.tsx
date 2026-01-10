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

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center hover:opacity-80 transition-opacity p-2"
            >
              <Image
                src={logoImage}
                alt="Prasanna Logo"
                width={96}
                height={96}
                className="w-16 h-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <a href="/" className="text-gray-100 hover:text-blue-400 transition-colors text-xl">
                About
              </a>
              <a href="/talks" className="text-gray-100 hover:text-purple-400 transition-colors text-xl">
                Talks
              </a>
              <a href="/blog" className="text-gray-100 hover:text-cyan-400 transition-colors text-xl">
                Blog
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Top (Logo only) */}
      <nav className="md:hidden bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center hover:opacity-80 transition-opacity p-2"
            >
              <Image
                src={logoImage}
                alt="Prasanna Logo"
                width={96}
                height={96}
                className="w-16 h-auto"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 shadow-lg z-50">
        <div className="flex items-center justify-around h-16 px-2">
          <a 
            href="/"
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              isActive('/') ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">About</span>
          </a>
          
          <a 
            href="/blog"
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              isActive('/blog') ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-xs mt-1">Blog</span>
          </a>
          
          <a 
            href="/talks"
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              isActive('/talks') ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-xs mt-1">Talks</span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;