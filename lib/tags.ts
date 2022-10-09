import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllTags() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  let tagCount = {};

  // Iterate through each post, putting all found tags into `tags`
  fileNames.forEach((file) => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    if (data.tags) {
      data.tags.forEach((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1;
        } else {
          tagCount[tag] = 1;
        }
        // const formattedTag = kebabCase(tag);
        // if (formattedTag in tagCount) {
        //   tagCount[formattedTag] += 1
        // } else {
        //   tagCount[formattedTag] = 1
        // }
      });
    }
  });

  return tagCount;

  //   const results = Object.keys(tagCount);
  //   results.sort((a, b) => {
  //     if (a > b) {
  //       return 1;
  //     } else {
  //       return -1;
  //     }
  //   });

  //   return results.map((result) => {
  //     return {
  //       name: result,
  //       count: tagCount[result],
  //     };
  //   });
}

export async function getTagPosts(tag: string) {
  const fileNames = fs.readdirSync(postsDirectory);
  const results = [];

  fileNames.forEach((file) => {
    const fullPath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    if (data.tags) {
      console.log(`data: ${data}`);
      if (data.tags.includes(tag)) {
        results.push({
          id: file.replace(/\.md$/, ""),
          ...data,
        });
      }
    }
  });

  return results.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
