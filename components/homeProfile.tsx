import Link from "next/link";
import styles from "./homeProfile.module.css";

const HomeProfile = () => {
  return (
    <section className="flex flex-nowrap flex-col w-full h-80 bg-[url('/images/home_profile_light.jpeg')] dark:bg-[url('/images/home_profile_dark.jpeg')] bg-cover bg-no-repeat bg-top p-6 mt-4 rounded-2xl">
      <span className="text-3xl font-extrabold leading-10 my-7">
        Lazywon's Dev Story
      </span>
      <span className="text-xl font-normal break-all">Welcome :-)</span>
      <Link href="/about">
        <a className="mt-3 text-sm text-blue-50 hover:text-red-200">
          Learn more..
        </a>
      </Link>
    </section>
  );
};

export default HomeProfile;
