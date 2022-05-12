import Banner from "../../common/Banner/Banner";
import classes from "./Home.module.scss";
import Instagram from "../../functional/Instagram/Instagram";
import { InstaFeed } from "../../../models/instagram.model";
import Associations from "./Associations";
import BodyBanner from "../../common/Banners/BodyBanner/BodyBanner";
import { Banner as BannerType } from "../../../types/types";
import GalleryBanner from "../../common/Banners/GalleryBanner/GalleryBanner";

const Home: React.FC<{
  banners: any;
  instaFeed: InstaFeed[];
  ornamentAssociation: any;
  bodyBanner: any;
  projectsBanner: BannerType;
  mainbanner: BannerType;
}> = ({
  banners,
  instaFeed,
  ornamentAssociation,
  bodyBanner,
  projectsBanner,
  mainbanner,
}) => {
  return (
    <>
      <Banner title={"Home"} banner={mainbanner} />
      <main className={classes.main}>
        <div className={classes.header}>
          <h1>KATYA RG LEOTARDS</h1>
          <p>
            Specjalizujemy się w spełnianiu marzeń o pięknych i oryginalnych
            strojach startowych do gimnastyki artystycznej, akrobatyki
            powietrznej oraz łyżwiarstwa figurowego. Wieloletnie doświadczenie
            pozwala spełnić niemal każde Państwa życzenie.
          </p>
        </div>
        <Associations association={ornamentAssociation} type={"ozdoby"} />
        <BodyBanner banner={bodyBanner} />
        <GalleryBanner banner={projectsBanner} />

        <Instagram instaFeed={instaFeed} />
      </main>
    </>
  );
};

export default Home;
