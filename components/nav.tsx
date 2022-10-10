import Link from "next/link";
import React from "react";
import navlinks from "../data/navlinks";

const Nav = () => {
  return (
    <nav className="flex relative w-full max-w-2xl items-center justify-between mx-auto">
      <div>
        {navlinks.map(({ title, link }) => (
          <Link href={link} key={title}>
            <a className="mr-4 font-semibold">{title}</a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
