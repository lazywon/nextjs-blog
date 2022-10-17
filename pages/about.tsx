import Layout from "../components/layout";
import { NextSeo } from "next-seo";
import metadata from "../data/metadata";

export default function About() {
  return (
    <Layout>
      <NextSeo
        title="About"
        description="About Lazywon"
        canonical={`${metadata.url}/about`}
        openGraph={{ url: `${metadata.url}/about` }}
      />
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="font-extrabold text-3xl mb-4 md:text-4xl md:leading-14 sm:text-4xl sm:leading-10">
          About Page
        </h1>
        <p className="font-bold">...</p>
      </div>
    </Layout>
  );
}
