import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import Body from "../../components/page/Body/Body";

const BriefsPage: NextPage = ({
  briefs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Body bodyItem={briefs}></Body>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const briefs = await client.getEntries({
    content_type: "body",
    "fields.label": "briefs",
  });

  return {
    props: {
      briefs: briefs.items[0],
    },
    revalidate: 600,
  };
};

export default BriefsPage;
