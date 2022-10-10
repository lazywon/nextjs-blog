import Layout from "../components/layout";

// custom error page
export default function NotFound() {
  return (
    <Layout>
      <div>
        <h1 className="font-extrabold text-5xl mb-4">404</h1>
        <p className="font-bold">
          Sorry, we couldn't find this page.
          <br />
          Please double check that URL.
        </p>
      </div>
    </Layout>
  );
}
