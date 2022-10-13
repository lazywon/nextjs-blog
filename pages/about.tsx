import Layout from "../components/layout";
import { NextSeo } from "next-seo";
import metadata from "../data/metadata";

export default function About() {
  return (
    <Layout>
      <NextSeo
        title="About"
        canonical={`${metadata.url}/about`}
        openGraph={{ url: `${metadata.url}/about` }}
      />
      <div>
        <h1 className="font-extrabold text-5xl mb-4">About Page</h1>
        <p className="font-bold">...</p>
      </div>
    </Layout>
  );
}
