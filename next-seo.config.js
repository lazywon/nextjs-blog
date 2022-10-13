import metadata from "data/metadata";

const SEO = {
  titleTemplate: "%s | lazywon.dev",
  defaultTitle: metadata.title,
  description: "Lazywon의 개발 성장 스토리입니다.",
  canonical: "https://lazywon.vercel.app/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://lazywon.vercel.app/",
    site_name: "Lazywon's Devlog",
    //   images: [{ url: 'https://example.com/example_square_image.png' }],
  },
};

export default SEO;
