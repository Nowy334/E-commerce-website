import { createClient } from "contentful";
import { Ornament } from "../../models/ornament";
import type { InferGetStaticPropsType } from "next";
import Product from "../../components/common/ProductPage/Product";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "ornaments",
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
    content_type: "ornaments",
    "fields.slug": params.slug,
  });

  return {
    props: {
      ornament: items[0],
    },
  };
};

const Slug = ({ ornament }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Product product={ornament} />;
};

export default Slug;
