import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { createClient } from "contentful";
import Link from "next/link";
import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Home from "../components/page/Home/Home";

const HomePage: NextPage = ({
  banners,
  insta,
  ornamentAssociation,
  bodyBanner,
  projectsBanner,
  mainbanner,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {
        <Home
          banners={banners}
          ornamentAssociation={ornamentAssociation}
          instaFeed={insta}
          bodyBanner={bodyBanner}
          projectsBanner={projectsBanner}
          mainbanner={mainbanner}
        />
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const mainbanner = await client.getEntry("1JME2CmObaVbjo1YH0jYE7");
  const bodyBanner = await client.getEntry("3r5bOlrZ7IgjFlyP9G4tyg");
  const projectsBanner = await client.getEntry("1uNIGqbsgivgv5vpwrLLJ1");
  const banners = await client.getEntries({ content_type: "banners" });
  const ornamentAssociation = await client.getEntries({
    content_type: "ornaments",
    "metadata.tags.sys.id[all]": "ornamentAssociation",
  });

  let data;

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,permalink,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`,
      {
        credentials: "same-origin",
      }
    );
    data = await res.json();
  } catch (err) {}
  const filterInstaFeed = data.data.filter(
    (item: any) => item.media_type != "VIDEO"
  );
  const instaFeed = filterInstaFeed.slice(0, 4);

  return {
    props: {
      banners: banners.items,
      insta: instaFeed,
      ornamentAssociation: ornamentAssociation,
      bodyBanner,
      projectsBanner,
      mainbanner,
    },
  };
};

export default HomePage;
