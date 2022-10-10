import Link from "next/link";
import Date from "../components/date";

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
        <li className="mx-0 mt-0 mb-5" key={id}>
          <Link href={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <br />
          <small className="text-gray-500">
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </>
  );
};

export default RecentPosts;
