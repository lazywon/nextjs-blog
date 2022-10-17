import Head from "next/head";
import RecentPosts from "../components/recentPosts";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
  }[];
}) {
  return (
    <Layout home>
      <section className="text-lg pt-px">
        <h2 className="text-2xl my-4 mx-0">Recent Posts</h2>
        <ul className="list-none p-0 m-0">
          {allPostsData.length >= 5 ? (
            <RecentPosts posts={allPostsData.slice(0, 5)} />
          ) : (
            <RecentPosts posts={allPostsData} />
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
