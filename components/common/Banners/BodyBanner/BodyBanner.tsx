import { FC } from "react";
import s from "./BodyBanner.module.scss";
import { Banner } from "../../../../types/types";
import Link from "next/link";
import Image from "@ui/Image";
import Button from "@ui/Button/Button";

const BodyBanner: FC<{ banner: Banner }> = ({ banner }) => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div>
          <h2>{banner.fields.title}</h2>
          <p>{banner.fields.description}</p>
        </div>
        <Button
          classname={s.btn}
          path={banner.fields.path}
          btnText={banner.fields.buttonName}
        />
      </div>
      <div className={s.images__container}>
        <div className={s.banner__image}>
          <Image
            customLoader={true}
            src={banner.fields.image.fields.file.url}
            layout="responsive"
            objectFit="cover"
            height={banner.fields.image.fields.file.details.image?.height}
            width={banner.fields.image.fields.file.details.image?.width}
            alt={banner.fields.image.fields.title}
          ></Image>
        </div>
        <div className={s.container}>
          {banner.fields.images.map((el) => {
            return (
              <div key={el.sys.id} className={s.banner__images}>
                <Image
                  customLoader={true}
                  src={el.fields.file.url}
                  layout="fill"
                  objectFit="cover"
                  alt={el.fields.title}
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BodyBanner;
