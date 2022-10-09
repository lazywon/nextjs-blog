import { GetStaticProps } from "next";
import Layout from "../components/layout";
import { getAllTags } from "../lib/tags";
import Tag from "../components/tag";
import Link from "next/link";

const Tags = ({ tags }) => {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <Layout>
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className="flex max-w-lg flex-wrap">
        {Object.keys(tags).length === 0 && "No tags found."}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="mt-2 mb-2 mr-5">
              <Tag text={t} />
              <Link
                href={`/tags/${t}`}
                className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
              >
                {` (${tags[t]})`}
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Tags;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tags = getAllTags();

  return {
    props: {
      tags,
    },
  };
};
