import Link from "next/link";
import styles from "./homeProfile.module.css";

const HomeProfile = () => {
  return (
    <section className={styles.section}>
      <span className={styles.title}>Lazywon's Dev Story</span>
      <span className={styles.text}>Welcome :-)</span>
      <Link href="/about">
        <a className={styles.link}>Learn more..</a>
      </Link>
    </section>
  );
};

export default HomeProfile;
