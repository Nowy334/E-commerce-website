import { InstaFeed } from "../../../models/instagram.model";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./Item.module.scss";

const Item: FC<{ item: InstaFeed }> = ({ item }) => {
  return (
    <div className={s.item}>
      <Link href={item.permalink}>
        <a className={s.item}>
          <Image
            src={item.media_url}
            alt="główny banner"
            objectFit="cover"
            layout="fill"
            unoptimized
          />
        </a>
      </Link>
    </div>
  );
};

export default Item;
