import { FC } from "react";
import Link from "next/link";
import Image, { ImageLoaderProps } from "next/image";
import s from "./ProductsCart.module.scss";
import { useAppDispatch } from "../../../store/hooks";
import { removeFromCart } from "../../../store/cart.slice";
import Price from "../../functional/Price/Price";
import InputQuantity from "../../functional/InputQuantity/InputQuantity";

const ProductsCart: FC<{ products: any }> = ({ products }) => {
  const dispatch = useAppDispatch();
  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${src}?w=${width}&q=${quality || 75}`;
  };

  const getUrl = (item: any) => {
    if (item.sys.contentType.sys.id === "ornaments") {
      return `ozdoby-do-wlosow/${item.fields.slug}`;
    } else if (item.sys.contentType.sys.id === "body") {
      return `/body`;
    } else {
      return `stroje-startowe/${item.fields.slug}`;
    }
  };

  return (
    <ul>
      {products.map((item: any, index: number) => {
        return (
          <li key={index} className={s.cart__item}>
            <div className={s.product__content}>
              <Link href={getUrl(item)} passHref={true}>
                <div className={s.product__image}>
                  <Image
                    loader={myLoader}
                    src={item.fields.mainPhoto.fields.file.url}
                    alt="główny banner"
                    objectFit="cover"
                    layout="fill"
                  ></Image>
                </div>
              </Link>
              <div className={s.content__wrapper}>
                <div className={s.product__title}>{item.fields.title}</div>
                <div>
                  {item.fields?.color && (
                    <div className={s.product__properties}>
                      kolor: {item.fields.color[0]}
                    </div>
                  )}
                  {!item.fields?.color && !item.fields?.size && (
                    <div className={s.product__properties}>
                      rozmiar: {item.fields.title}
                    </div>
                  )}
                  {item.fields?.size && (
                    <div className={s.product__properties}>
                      rozmiar: {item.fields.size}
                    </div>
                  )}
                </div>
                <div className={s.mobile}>
                  <span className={s.quantity__mobile}>{item.quantity} x </span>
                  <Price price={item.fields.price} />
                </div>
                <div
                  className={s.delete}
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Usuń
                </div>
              </div>
            </div>
            <Price price={item.fields.price} s={s.data} />
            {/* <div className={s.data}>{item.quantity}</div> */}
            <InputQuantity product={item} />
            <Price price={item.fields.price * item.quantity} s={s.data} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsCart;
