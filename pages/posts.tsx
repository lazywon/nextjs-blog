import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Search from "../components/search";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import Image from "next/image";

export default function Posts({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description: string;
    thumbnailUrl: string;
  }[];
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredBlogPosts = allPostsData.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-lg pt-px">
        <h2 className="text-2xl my-4 mx-0">Posts</h2>
        <Search handleSearch={handleSearch} />
        <ul className="list-none p-0 m-0">
          {filteredBlogPosts.map(
            ({ id, date, title, description, thumbnailUrl }) => (
              <li className="mx-0 mt-0 mb-5" key={id}>
                <div className="flex flex-nowrap items-center justify-between w-full cursor-pointer">
                  <div className="">
                    <Link href={`/posts/${id}`}>
                      <a className="">{title}</a>
                    </Link>
                    <br />
                    <span className="text-sm text-gray-500">{description}</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      <Date dateString={date} />
                    </span>
                  </div>
                  <Image
                    src={thumbnailUrl}
                    className=""
                    alt="thumbnail"
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </div>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
