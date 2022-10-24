import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Date from "./date";
import Pagination from "./pagination";
import Search from "./search";

const PostList = ({ allPostsData, initialDisplayPosts, pagination }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredBlogPosts = allPostsData.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <section className="text-lg pt-px">
        <h1 className="text-3xl font-extrabold leading-9 my-4 mx-0 md:text-4xl md:leading-14 sm:text-4xl sm:leading-10">
          Posts
        </h1>
        <Search handleSearch={handleSearch} />
        <ul className="list-none p-0 m-0">
          {displayPosts.map(
            ({ id, date, title, description, thumbnailUrl }) => (
              <li className="mx-0 mt-0 mb-5" key={id}>
                <div className="flex flex-nowrap items-center justify-between w-full cursor-pointer">
                  <div className="">
                    <Link href={`/posts/${id}`}>
                      <a className="">{title}</a>
                    </Link>
                    <br />
                    <span className="text-sm text-gray-500">{description}</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      <Date dateString={date} />
                    </span>
                  </div>
                  <Image
                    src={thumbnailUrl}
                    className=""
                    alt="thumbnail"
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </div>
              </li>
            )
          )}
        </ul>
      </section>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
};

export default PostList;
