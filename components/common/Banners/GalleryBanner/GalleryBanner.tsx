import Link from "next/link";
import { FC } from "react";
import { Banner } from "@types";
import s from "./GalleryBanner.module.scss";
import Image from "@ui/Image";
import Button from "@ui/Button/Button";

const GalleryBanner: FC<{ banner: Banner }> = ({ banner }) => {
  return (
    <div className={s.root}>
      <h2>{banner.fields.title}</h2>
      <div className={s.container}>
        {banner.fields.images.map((el) => {
          return (
            <div key={el.sys.id} className={s.banner__image}>
              <Image
                customLoader={true}
                src={el.fields.file.url}
                layout="responsive"
                objectFit="cover"
                height={el.fields.file.details.image?.height}
                width={el.fields.file.details.image?.width}
                alt={el.fields.title}
              ></Image>
            </div>
          );
        })}
      </div>
      <Button
        classname={s.btn}
        path={banner.fields.path}
        btnText={banner.fields.buttonName}
      />
    </div>
  );
};

export default GalleryBanner;
