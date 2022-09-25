import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a href="mailto:jooowon.dev@gmail.com" target="_blank" rel="noreferrer">
          <Image src="/images/email_icon.png" width={20} height={20} />
        </a>
        <a href="https://github.com/lazywon" target="_blank" rel="noreferrer">
          <Image src="/images/github_icon.png" width={20} height={20} />
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
