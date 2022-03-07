import { FC } from "react";
import Link from "next/link";
import Image, { ImageLoaderProps } from "next/image";
import s from "./Product.module.scss";
import Price from "../../functional/Price/Price";

const Product: FC<{ product: any; type: string }> = ({ product, type }) => {
  const url = type === "ozdoby" ? "ozdoby-do-wlosow" : "stroje-startowe";

  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${product.fields.mainPhoto.fields.file.url}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <li className={s.root}>
      <Link href={`${url}/${product.fields.slug}`}>
        <a className={s.product__link}>
          <div className={s.product__image}>
            <Image
              loader={myLoader}
              src={product.fields.mainPhoto.fields.file.fileName}
              alt="główny banner"
              objectFit="cover"
              layout="fill"
            ></Image>
          </div>
          <div className={s.product__content}>
            <div className={s.product__title}>{product.fields.title}</div>
            <Price price={product.fields.price} s={s.product__price} />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Product;
