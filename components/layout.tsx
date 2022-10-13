import Head from "next/head";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const siteTitle = "Lazywon's Blog";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = window.localStorage.getItem("theme");
    savedTheme && setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="max-w-xl py-0 px-4 mx-auto mt-0 mb-24">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta name="description" content="Lazywon's Dev Blog" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" /> */}
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Header home={home} theme={theme} setTheme={setTheme} mounted={mounted} />
      <main>{children}</main>
      {!home && (
        <div className="mt-12 mx-0 mb-0">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <Footer theme={theme} />
    </div>
  );
}
