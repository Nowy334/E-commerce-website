import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import ProductsList from "../../components/common/Products/ProductsList";
import Header from "../../components/ui/Header/Header";

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
  console.log(ornaments);
  return (
    <>
      <Header title={"Korony na kok"} />
      <main>
        <ProductsList products={ornaments} type="ozdoby" />
      </main>
    </>
  );
};

export default Ornaments;
