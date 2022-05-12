import { FC } from "react";
import { InstaFeed } from "../../../models/instagram.model";
import Item from "./Item";
import s from "./Instagram.module.scss";
import Link from "next/link";
import instaLogo from "../../../public/assets/logo.png";
import Image from "next/image";

const Instagram: FC<{ instaFeed: InstaFeed[] }> = ({ instaFeed }) => {
  const InstaItems = instaFeed.map((item) => {
    return <Item key={item.id} item={item} />;
  });

  return (
    <div className={s.content}>
      <h3 className={s.title}>OBSERWUJCIE NAS NA INSTAGRAMIE</h3>
      <div className={s.link__insta__content}>
        <Link href={"https://www.instagram.com/katya_rgleotards"}>
          <a className={s.link__content}>
            <div className={s.image__overlay}>
              <Image
                src={instaLogo}
                objectFit="contain"
                layout="fill"
                alt="Instagram Katya logo"
                unoptimized
              />
            </div>
            <span className={s.desc}>KATYA_RGLEOTARDS</span>
          </a>
        </Link>
      </div>
      <div className={s.items__list}>{InstaItems}</div>
    </div>
  );
};

export default Instagram;
