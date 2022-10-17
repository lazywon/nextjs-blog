import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Date from "../../components/date";
import Layout from "../../components/layout";
import metadata from "../../data/metadata";
import { getAllTags, getTagPosts } from "../../lib/tags";

const Tag = ({ posts, tag }) => {
  // Capitalize first letter and convert space to dash
  const tagName = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  return (
    <Layout>
      <NextSeo
        title={tagName}
        description=""
        canonical={`${metadata.url}/tags/${tag}`}
        openGraph={{ url: `${metadata.url}/tags/${tag}` }}
      />
      <section className="text-lg pt-px">
        <h2 className="text-2xl my-4 mx-0">{tagName}</h2>
        {/* <Search handleSearch={handleSearch} /> */}
        <ul className="list-none p-0 m-0">
          {posts.map(({ id, date, title }) => (
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
