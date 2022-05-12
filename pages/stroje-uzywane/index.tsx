import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import ProductsList from "../../components/common/Products/ProductsList";
import Header from "../../components/ui/Header/Header";

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const outfits = await client.getEntries({
    content_type: "product",
    "fields.secondHand": true,
  });

  return {
    props: {
      outfits: outfits.items,
    },
    revalidate: 600,
  };
};

const UsedOutfits: NextPage = ({
  outfits,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header title={"Stroje startowe"} />
      <main>
        <ProductsList products={outfits} type="stroje" />
      </main>
    </>
  );
};

export default UsedOutfits;
