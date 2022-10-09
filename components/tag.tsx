import Link from "next/link";
import React from "react";

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${text}`}>
      <a className="mr-1 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(" ").join("-")}
      </a>
    </Link>
  );
};

export default Tag;
