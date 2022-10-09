import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllTags, getTagPosts } from "../../lib/tags";
import utilStyles from "../../styles/utils.module.css";

const Tag = ({ posts, tag }) => {
  // Capitalize first letter and convert space to dash
  const tagName = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  return (
    <Layout>
      <Head>
        <title>{tagName}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{tagName}</h2>
        {/* <Search handleSearch={handleSearch} /> */}
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Tag;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags();

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filteredPosts = await getTagPosts(params.tag as string);

  return {
    props: {
      posts: filteredPosts,
      tag: params.tag,
    },
  };
};
