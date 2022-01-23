import Banner from "../../common/Banner/Banner";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./Home.module.scss";

import { MainPageBanner } from "../../../models/mainPageBanner.model";
import BannerMainPage from "../../common/BannerMainPage/BannerMainPage";
import Instagram from "../../functional/Instagram/Instagram";
import { InstaFeed } from "../../../models/instagram.model";

const Home: React.FC<{ banners: any; instaFeed: InstaFeed[] }> = ({
  banners,
  instaFeed,
}) => {
  //const router = useRouter();

  const mainBanners = banners
    .sort((a: any, b: any) => {
      return a.fields.position - b.fields.position;
    })
    .map(({ fields }: { fields: MainPageBanner }, index: number) => {
      let bannerObj: MainPageBanner;
      bannerObj = {
        image: fields.image,
        title: fields.title,
        description: fields.description,
        path: fields.path,
        buttonName: fields.buttonName,
      };
      return (
        <BannerMainPage
          banner={bannerObj}
          order={index % 2 === 1 ? true : false}
          key={index}
        />
      );
    });
  return (
    <>
      <Banner title={"Home"} />
      <main className={classes.main}>
        {mainBanners}
        <Instagram instaFeed={instaFeed} />
      </main>
      {/* <Link href="/" locale={router.locale === "pl" ? "en" : "pl"}>
        <button>zmien jezyk</button>
      </Link> */}
    </>
  );
};

export default Home;
