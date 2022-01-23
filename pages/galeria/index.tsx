import Link from "next/link";
import type { NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import type { GetStaticProps } from "next";

import Banner from "../../components/common/Banner/Banner";
import PhotoGallery from "../../components/page/Gallery/PhotoGallery";

const Gallery: NextPage = ({
  gallery,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Banner title="Galeria" />
      <PhotoGallery photos={gallery.photos} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const gallery = await client.getEntries({
    content_type: "image",
    limit: 200,
  });
  return {
    props: {
      gallery: gallery.items[0].fields,
    },
  };
};

export default Gallery;
