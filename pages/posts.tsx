import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Search from "../components/search";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import React, { useState } from "react";

export default function Posts({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
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
          {filteredBlogPosts.map(({ id, date, title }) => (
            <li className="mx-0 mt-0 mb-5" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
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
