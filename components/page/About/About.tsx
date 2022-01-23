import Banner from "../../common/Banner/Banner";
import Image from "next/image";
import { FC } from "react";
import s from "./About.module.scss";

const About: FC<{ banner: any }> = ({ banner }) => {
  const banners =
    banner[0].fields.banners.length >= 1 &&
    banner[0].fields.banners.map((el: any) => {
      return (
        <div className={s.image} key={el.sys.id}>
          <Image
            src={`https:${el.fields.file.url}`}
            alt={el.fields.title}
            objectFit="cover"
            layout="fill"
          ></Image>
        </div>
      );
    });

  return (
    <div>
      <Banner title={"O nas"} />
      <main className={s.main}>
        <div className={s.description}>
          {banner.length >= 1 && banner[0].fields.description}
        </div>
        <div className={s.image__container}>{banners}</div>
      </main>
    </div>
  );
};

export default About;
