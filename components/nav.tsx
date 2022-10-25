import Link from "next/link";
import React from "react";
import navlinks from "../data/navlinks";
import MobileNav from "./mobileNav";

const Nav = () => {
  return (
    <nav className="flex relative w-full max-w-2xl items-center justify-between mx-auto">
      <div className="hidden sm:block">
        {navlinks.map(({ title, link }) => (
          <Link href={link} key={title}>
            <a className="mr-4 font-semibold">{title}</a>
          </Link>
        ))}
      </div>
      <MobileNav />
    </nav>
  );
};

export default Nav;
