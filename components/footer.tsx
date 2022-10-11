import Image from "next/image";
import Link from "next/link";

interface themeMode {
  theme: string;
}

const Footer = ({ theme }: themeMode) => {
  return (
    <footer className="flex flex-col p-8 mt-28 items-center border-solid border-t border-gray-300 border-b-0 border-r-0 border-l-0">
      <div className="">
        <a
          href="mailto:jooowon.dev@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="ml-2 mr-2 cursor-pointer"
        >
          {theme === "dark" ? (
            <Image src="/images/email_light.png" width={20} height={20} />
          ) : (
            <Image src="/images/email_dark.png" width={20} height={20} />
          )}
        </a>
        <a
          href="https://github.com/lazywon"
          target="_blank"
          rel="noreferrer"
          className="ml-2 mr-2 cursor-pointer"
        >
          {theme === "dark" ? (
            <Image src="/images/github_light.png" width={20} height={20} />
          ) : (
            <Image src="/images/github_dark.png" width={20} height={20} />
          )}
        </a>
      </div>
      <span className="mt-3 text-sm">Copyright © 2022 Lazywon</span>
      <Link href="/">
        <a className="text-xs mt-3 text-gray-400 hover:text-blue-400">
          lazywon.dev
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
