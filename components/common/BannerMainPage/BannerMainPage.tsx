import Link from "next/link";
import Image, { ImageLoaderProps } from "next/image";
import { MainPageBanner } from "../../../models/mainPageBanner.model";
import classes from "./BannerMainPage.module.scss";
import Button from "../../ui/Button";

const BannerMainPage: React.FC<{ banner: MainPageBanner; order?: boolean }> = ({
  banner,
  order,
}) => {
  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${banner.image.fields.file.url}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <div
      className={classes.banner__container + " " + (order ? classes.order : "")}
    >
      <div className={classes.banner__content}>
        <h2 className={classes.banner__title}>{banner.title}</h2>
        <p className={classes.banner__desc}>{banner.description}</p>
        <Button path={banner.path} btnText={banner.buttonName}></Button>
      </div>
      <div className={classes.banner__image}>
        <Image
          loader={myLoader}
          src={banner.image.fields.file.fileName}
          objectFit="cover"
          layout="fill"
          alt=""
        ></Image>
      </div>
    </div>
  );
};

export default BannerMainPage;
