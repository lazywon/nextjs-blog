import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";

// custom error page
export default function NotFound() {
  return (
    <Layout>
      <div>
        <h1 className={utilStyles.errorCode}>404</h1>
        <p className={utilStyles.errorMsg}>
          Sorry, we couldn't find this page.
          <br />
          Please double check that URL.
        </p>
      </div>
    </Layout>
  );
}
