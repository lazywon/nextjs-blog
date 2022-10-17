import Image from "next/image";
import Link from "next/link";
import Nav from "./nav";
import HomeProfile from "./homeProfile";

const Header = ({ home, theme, setTheme, mounted }) => {
  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <header className="flex flex-col justify-center items-center pt-8 pb-16">
      <div className="flex justify-between items-center flex-nowrap w-full">
        <Nav />
        <div className="flex flex-row items-center justify-between">
          <button
            className="w-20 border-0 outline-0 bg-transparent pt-1"
            onClick={changeTheme}
          >
            {mounted && theme === "dark" ? (
              <Image
                priority
                src="/images/light.png"
                className={`rounded-full cursor-pointer transition-all ease-in duration-300 hover:origin-center hover:rotate-45 hover:scale-105`}
                height={40}
                width={40}
                alt="light mode로 변경"
              />
            ) : (
              <Image
                priority
                src="/images/dark.png"
                className={`rounded-full cursor-pointer transition-all ease-in duration-300 hover:origin-center hover:rotate-45 hover:scale-105`}
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
                className="rounded-full"
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
                    className="rounded-full"
                    height={80}
                    width={80}
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
