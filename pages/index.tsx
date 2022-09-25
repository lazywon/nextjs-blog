import Head from "next/head";
import RecentPosts from "../components/recentPosts";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p>Hello World! I'm Lazywon :-) I'm a frontend developer.</p>
        <p>Welcome to my Devlog ! </p>
      </section> */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recent Posts</h2>
        <ul className={utilStyles.list}>
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
