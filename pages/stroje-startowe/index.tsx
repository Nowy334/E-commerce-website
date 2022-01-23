import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import ProductsList from "../../components/common/Products/ProductsList";
import Banner from "../../components/common/Banner/Banner";

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const outfits = await client.getEntries({ content_type: "product" });

  return {
    props: {
      outfits: outfits.items,
    },
  };
};

const Outfits: NextPage = ({
  outfits,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Banner title={"Ozdoby do włosow"} />
      <main>
        <ProductsList products={outfits} type="stroje" />
      </main>
    </>
  );
};

export default Outfits;
