import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import ProductsList from "../../../components/common/Products/ProductsList";
import Header from "../../../components/ui/Header/Header";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const ornaments = await client.getEntries({
    content_type: "ornaments",
    "fields.color[match]": context.params ? context.params.product : null,
  });

  return {
    props: {
      ornaments: ornaments.items,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "ornamentsColor",
  });

  const paths = res.items.map((item: any) => {
    return {
      params: { product: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const OrnamentsPage: NextPage = ({
  ornaments,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header title={"Korony na kok"} />
      <main>
        <ProductsList products={ornaments} type="ozdoby" />
      </main>
    </>
  );
};

export default OrnamentsPage;
