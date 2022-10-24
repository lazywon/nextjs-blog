import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Layout from "../../../components/layout";
import PostList from "../../../components/postList";
import metadata from "../../../data/metadata";
import { getSortedPostsData } from "../../../lib/posts";
import { POSTS_PER_PAGE } from "../../posts";

const PostPage = ({
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
}) => {
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
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getSortedPostsData();
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { page },
  } = context;
  const allPostsData = getSortedPostsData();
  const pageNumber = parseInt(page as string);
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
