import { FC } from "react";
import Link from "next/link";
import s from "./ProductsCart.module.scss";
import { useAppDispatch } from "../../../store/hooks";
import { removeFromCart } from "../../../store/cart.slice";
import Price from "../../functional/Price/Price";
import InputQuantity from "../../functional/InputQuantity/InputQuantity";
import Image from "@ui/Image";

const ProductsCart: FC<{ products: any; completed?: boolean }> = ({
  products,
  completed = false,
}) => {
  const dispatch = useAppDispatch();

  const getUrl = (item: any) => {
    if (item.sys.contentType.sys.id === "ornaments") {
      return `korony-na-kok/${item.fields.color}/${item.fields.slug}`;
    } else if (item.sys.contentType.sys.id === "body") {
      return `/body`;
    } else if (item.fields.secondHand === true) {
      return `/stroje-uzywane/${item.fields.slug}`;
    } else if (item.fields.secondHand === false) {
      return `/nowe-stroje/${item.fields.slug}`;
    } else {
      return "";
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
                    customLoader={true}
                    src={item.fields.mainPhoto.fields.file.url}
                    alt={item.fields.mainPhoto.fields.title}
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
