import { FC } from "react";
import Link from "next/link";
import s from "./Product.module.scss";
import Price from "../../functional/Price/Price";
import Image from "@ui/Image";

const Product: FC<{ product: any; type: string; association?: boolean }> = ({
  product,
  type,
  association = false,
}) => {
  const url =
    type === "ozdoby"
      ? `/korony-na-kok/${product.fields.color[0]}`
      : product.fields?.secondHand === true
      ? "/stroje-uzywane"
      : "/nowe-stroje";

  return (
    <li className={s.root}>
      <Link href={`${url}/${product.fields.slug}`}>
        <a className={s.product__link}>
          <div
            className={
              s.product__image + " " + (association ? s.association__image : "")
            }
          >
            <Image
              customLoader={true}
              src={product.fields.mainPhoto.fields.file.url}
              alt={product.fields.mainPhoto.fields.title}
              objectFit="cover"
              layout="fill"
              priority={true}
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
