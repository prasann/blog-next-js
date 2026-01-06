import { useRouter } from "next/router";
import Image from "next/image";
import logoImage from "./../../../public/assets/logo.png";

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="navbar bg-base-200 border-b border-base-300">
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
      <div className="navbar-end md:hidden">
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
  );
};

export default NavBar;