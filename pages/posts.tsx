import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import React from "react";
import { NextSeo } from "next-seo";
import metadata from "../data/metadata";
import PostList from "../components/postList";

export const POSTS_PER_PAGE = 5;

export default function Posts({
  allPostsData,
  initialDisplayPosts,
  pagination,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description: string;
    thumbnailUrl: string;
  }[];
  initialDisplayPosts: {
    id: string;
    date: string;
    title: string;
    description: string;
    thumbnailUrl: string;
  }[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}) {
  return (
    <Layout>
      <NextSeo
        title="Posts"
        description="기술 블로그 작성 공간입니다."
        canonical={`${metadata.url}/posts`}
        openGraph={{ url: `${metadata.url}/posts` }}
      />
      <PostList
        allPostsData={allPostsData}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const pageNumber = 1;
  const initialDisplayPosts = allPostsData.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(allPostsData.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      allPostsData,
      initialDisplayPosts,
      pagination,
    },
  };
};
