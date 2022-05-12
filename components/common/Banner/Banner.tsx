import Image from "@ui/Image";
import classes from "./Banner.module.scss";
import { Banner as BannerType } from "@types";

const Banner: React.FC<{ title?: string; banner: BannerType }> = ({
  title,
  banner,
}) => {
  return (
    <header className={classes.header}>
      <div className={classes.img}>
        <h1 className={classes.banner__title}>{title}</h1>
        <Image
          customLoader={true}
          src={banner.fields.image.fields.file.url}
          layout="fill"
          objectFit="cover"
          alt="główny banner"
          priority={true}
        ></Image>
      </div>
    </header>
  );
};

export default Banner;
