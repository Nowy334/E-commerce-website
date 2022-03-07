import { InstaFeed } from "../../../models/instagram.model";
import { FC } from "react";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import s from "./Item.module.scss";

const Item: FC<{ item: InstaFeed }> = ({ item }) => {
  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}`;
  };
  return (
    <div className={s.item}>
      <Link href={item.permalink}>
        <a className={s.item}>
          <Image
            loader={myLoader}
            src={item.media_url}
            alt="główny banner"
            objectFit="cover"
            layout="fill"
          />
        </a>
      </Link>
    </div>
  );
};

export default Item;
