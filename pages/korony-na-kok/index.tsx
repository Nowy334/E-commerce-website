import type { NextPage, InferGetStaticPropsType } from "next";
import OrnamentsColors from "../../components/common/OrnamentColor/OrnamentColor";
import Header from "../../components/ui/Header/Header";
import { createClient } from "contentful";

import type { GetStaticProps } from "next";

const Ornaments: NextPage = ({
  ornamentsColor,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header title={"Korony na kok"} />
      <main>
        <OrnamentsColors ornamentsColor={ornamentsColor} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
  });

  const ornamentsColor = await client.getEntries({
    content_type: "ornamentsColor",
  });

  return {
    props: {
      ornamentsColor: ornamentsColor.items,
    },
    revalidate: 600,
  };
};

export default Ornaments;
