import { FC, useState } from "react";
import { isMobile } from "react-device-detect";
import { DynamicOptions } from "next/dynamic";
import useMobile from "../../utils/useMobile";
import Price from "../../functional/Price/Price";
import s from "./Product.module.scss";

import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../store/cart.slice";

import ProductImages from "../../functional/ProductImages/ProductImages";

const Product: FC<{ product: any }> = ({ product }) => {
  let images: string[] = [];
  const isMobile = useMobile();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  if (product.fields.mainPhoto) {
    images.push(product.fields.mainPhoto.fields.file.url);
  }
  if (product.fields.photos) {
    product.fields.photos.forEach((photo: any) => {
      images.push(photo.fields.file.url);
    });
  }

  const changeQuantity = (operation?: string, e?: any) => {
    if (e ? e.target.value === "0" : false) {
      setQuantity(1);
      return;
    }
    if (operation === "inc") {
      setQuantity(quantity + 1);
    } else if (operation === "dec") {
      if (quantity === 1) {
        return;
      }
      setQuantity(quantity - 1);
    } else {
      setQuantity(parseInt(e.target.value));
    }
  };

  return (
    <div className={s.root}>
      <ProductImages images={images} />
      <div className={s.content}>
        <div className={s.title}>{product.fields.title}</div>
        <Price price={product.fields.price} s={s.product__price} />
        <div className={s.desc}>{product.fields.description}</div>
        <div className={s.add__cart}>
          <div className={s.input__content}>
            <span
              className={s.quantity__changer}
              onClick={() => changeQuantity("dec")}
            >
              -
            </span>
            <input
              className={s.input}
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => changeQuantity("", e)}
            />
            <span
              className={s.quantity__changer}
              onClick={() => changeQuantity("inc")}
            >
              +{" "}
            </span>
          </div>
          <button
            className={s.add__cart__btn}
            onClick={() => dispatch(addToCart({ product, quantity }))}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
