import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";

import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css"; //okaidia
import "prismjs/components/prism-jsx.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import metadata from "../../data/metadata";
import { NextSeo } from "next-seo";

export default function Post({
  postData,
}: {
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
    thumbnailUrl: string;
  };
}) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    setMounted(true);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [mounted]);

  //scroll indicator
  const onScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (winScroll / height) * 100;
    setScroll(scrollPercent);
  };

  return (
    <>
      <div className="fixed top-0 z-10 w-full">
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-600">
          <div
            style={{ width: `${scroll}%` }}
            className="h-2 bg-lime-200"
          ></div>
        </div>
      </div>
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <NextSeo
          title={postData.title}
          description=""
          canonical={`${metadata.url}/posts/${postData.id}`}
          openGraph={{
            url: `${metadata.url}/posts/${postData.id}`,
            images: [
              {
                url: `${metadata.url}${postData.thumbnailUrl}`,
                width: 800,
                height: 600,
                alt: postData.title,
              },
            ],
          }}
        />
        <article>
          <h1 className="text-4xl font-extrabold tracking-tighter my-4 mx-0">
            {postData.title}
          </h1>
          <div className="text-gray-500">
            <Date dateString={postData.date} />
          </div>
          {
            <div
              className="prose prose-base dark:prose-invert mt-10 sm:my-16 language-jsx line-numbers"
              dangerouslySetInnerHTML={{
                __html: mounted && postData.contentHtml,
              }}
            />
          }
        </article>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
