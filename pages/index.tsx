import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Home from "../components/page/Home/Home";
import BannerMainPage from "../components/common/BannerMainPage/BannerMainPage";
import { MainPageBanner } from "../models/mainPageBanner.model";

const HomePage: NextPage = ({
  banners,
  insta,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      {<Home banners={banners} instaFeed={insta} />}
      {/* <div>
      {products.map((product) => {
        return <div key={product.sys.id}>{product.fields.title}</div>;
      })}
    </div> */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const banners = await client.getEntries({ content_type: "banners" });
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
    },
  };
};

export default HomePage;
