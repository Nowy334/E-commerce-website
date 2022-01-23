import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "./Product.module.scss";
import Price from "../../functional/Price/Price";

const Product: FC<{ product: any; type: string }> = ({ product, type }) => {
  const url = type === "ozdoby" ? "ozdoby-do-wlosow" : "stroje-startowe";
  return (
    <li className={s.root}>
      <Link href={`${url}/${product.fields.slug}`}>
        <a className={s.product__link}>
          <div className={s.product__image}>
            <Image
              src={`https:${product.fields.mainPhoto.fields.file.url}`}
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
