import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import Body from "../../components/page/Body/Body";

const BodyPage: NextPage = ({
  body,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <Body bodyItem={body}></Body>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const body = await client.getEntries({
    content_type: "body",
    "fields.label": "body",
  });

  return {
    props: {
      body: body.items[0],
    },
    revalidate: 600,
  };
};

export default BodyPage;
