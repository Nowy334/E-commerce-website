import Link from "next/link";
import type { NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";

import About from "../../components/page/About/About";
import type { GetStaticProps } from "next";

const AboutUs: NextPage = ({
  banner,
  mainBanner,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <About banner={banner} mainBanner={mainBanner} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const mainBanner = await client.getEntry("1JME2CmObaVbjo1YH0jYE7");
  const banner = await client.getEntries({ content_type: "snippetsbanners" });

  return {
    props: {
      banner: banner.items,
      mainBanner,
    },
    revalidate: 600,
  };
};

export default AboutUs;
