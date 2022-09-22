import Link from "next/link";
import React from "react";
import navlinks from "../data/navlinks";
import styles from "./nav.module.css";

const Nav = () => {
  return (
    <nav>
      {navlinks.map(({ title, link }) => (
        <Link href={link} key={title}>
          <a className={styles.title}>{title}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;