import Link from "next/link";
import type { NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";

import About from "../../components/page/About/About";
import type { GetStaticProps } from "next";

const AboutUs: NextPage = ({
  banner,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <About banner={banner} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const banner = await client.getEntries({ content_type: "snippetsbanners" });

  return {
    props: {
      banner: banner.items,
    },
  };
};

export default AboutUs;
