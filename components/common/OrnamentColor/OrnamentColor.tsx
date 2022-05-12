import Link from "next/link";
import { FC } from "react";
import s from "./OrnamentsColors.module.scss";
import { OrnamentsColor } from "@types";
import Image from "@ui/Image";
import { useMemo } from "react";

const OrnamentsColors: FC<{ ornamentsColor: Array<OrnamentsColor> }> = ({
  ornamentsColor,
}) => {
  const ornaments = useMemo(
    () =>
      ornamentsColor.map((el, index) => {
        return (
          <li key={index} className={s.root}>
            <Link href={{ pathname: `/korony-na-kok/${el.fields.slug}` }}>
              <a className={s.product__link}>
                <div className={s.product__image}>
                  <Image
                    customLoader={true}
                    src={el.fields.image.fields.file.url}
                    alt={el.fields.image.fields.title}
                    objectFit="cover"
                    layout="fill"
                    priority={true}
                  ></Image>
                </div>
                <div className={s.product__content}>
                  <div className={s.product__title}>{el.fields.color}</div>
                </div>
              </a>
            </Link>
          </li>
        );
      }),
    [ornamentsColor]
  );

  return <ul className={s.list}>{ornaments}</ul>;
};

export default OrnamentsColors;
