import Image from "next/image";
import styles from "./header.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Nav from "./nav";
import HomeProfile from "./homeProfile";

const Header = ({ home, theme, setTheme }) => {
  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Nav />
        <div className={styles.containerRight}>
          <button className={styles.themeButton} onClick={changeTheme}>
            {theme === "dark" ? (
              <Image
                priority
                src="/images/light.png"
                className={`${utilStyles.borderCircle} ${styles.sun}`}
                height={40}
                width={40}
                alt="light mode로 변경"
              />
            ) : (
              <Image
                priority
                src="/images/dark.png"
                className={`${utilStyles.borderCircle} ${styles.moon}`}
                height={40}
                width={40}
                alt="dark mode로 변경"
              />
            )}
          </button>

          {home ? (
            <>
              <Image
                priority
                src="/images/profile.png"
                className={utilStyles.borderCircle}
                height={80}
                width={80}
                alt=""
              />
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.png"
                    className={utilStyles.borderCircle}
                    height={108}
                    width={108}
                    alt=""
                  />
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
      {home && <HomeProfile />}
    </header>
  );
};

export default Header;
