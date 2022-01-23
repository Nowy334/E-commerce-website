import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import ProductsList from "../../components/common/Products/ProductsList";
import Banner from "../../components/common/Banner/Banner";

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const ornaments = await client.getEntries({ content_type: "ornaments" });

  return {
    props: {
      ornaments: ornaments.items,
    },
  };
};

const Ornaments: NextPage = ({
  ornaments,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Banner title={"Ozdoby do włosów"} />
      <main>
        <ProductsList products={ornaments} type="ozdoby" />
      </main>
    </>
  );
};

export default Ornaments;
