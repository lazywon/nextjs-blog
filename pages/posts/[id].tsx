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

  useEffect(() => {
    setMounted(true);
    Prism.highlightAll();
  }, []);

  return (
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
        <div
          className="prose prose-base dark:prose-invert mt-10 sm:my-16 language-jsx line-numbers"
          dangerouslySetInnerHTML={{ __html: mounted && postData.contentHtml }}
        />
      </article>
    </Layout>
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
