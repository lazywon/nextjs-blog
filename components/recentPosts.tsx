import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

const RecentPosts = ({
  posts,
}: {
  posts: {
    id: string;
    date: string;
    title: string;
  }[];
}) => {
  return (
    <>
      {posts.map(({ id, date, title }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </>
  );
};

export default RecentPosts;
