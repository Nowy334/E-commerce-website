import Image from "next/image";
//import banner from "../../../public/assets/main_banner.jpg";
import banner from "../../../public/assets/banner.jpg";
import classes from "./Banner.module.scss";

const Banner: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <header className={classes.header}>
      <div className={classes.img}>
        <h1 className={classes.banner__title}>{title}</h1>
        <Image
          src={banner}
          alt="główny banner"
          objectFit="cover"
          layout="fill"
        ></Image>
      </div>
    </header>
  );
};

export default Banner;
