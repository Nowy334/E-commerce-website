import { createClient } from "contentful";
import type { InferGetStaticPropsType } from "next";
import Product from "../../components/common/ProductPage/Product";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "product",
    "fields.secondHand": false,
  });

  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: any;
  locale: string;
}) => {
  const { items } = await client.getEntries({
    content_type: "product",
    "fields.secondHand": false,
    "fields.slug": params.slug,
  });

  return {
    props: {
      outfit: items[0],
    },
    revalidate: 600,
  };
};

const Slug = ({ outfit }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Product product={outfit} />;
};

export default Slug;
