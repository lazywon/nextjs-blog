import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

interface themeMode {
  theme: string;
}

const Footer = ({ theme }: themeMode) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a href="mailto:jooowon.dev@gmail.com" target="_blank" rel="noreferrer">
          {theme === "dark" ? (
            <Image src="/images/email_light.png" width={20} height={20} />
          ) : (
            <Image src="/images/email_dark.png" width={20} height={20} />
          )}
        </a>
        <a href="https://github.com/lazywon" target="_blank" rel="noreferrer">
          {theme === "dark" ? (
            <Image src="/images/github_light.png" width={20} height={20} />
          ) : (
            <Image src="/images/github_dark.png" width={20} height={20} />
          )}
        </a>
      </div>
      <span className={styles.text}>Copyright © 2022 Lazywon</span>
      <Link href="/">
        <a className={styles.home}>lazywon.dev</a>
      </Link>
    </footer>
  );
};

export default Footer;
