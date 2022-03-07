import { FC, useState } from "react";
import Price from "../../functional/Price/Price";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import s from "./Body.module.scss";

import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../store/cart.slice";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import Image, { ImageLoaderProps } from "next/image";

const Body: FC<{ bodyItem: any }> = ({ bodyItem }) => {
  //   const item = {...bodyItem};
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const [selectSize, setSelectSize] =
    useState<{ size: string; price: number }>();

  const handleSelectOption = (v: any) => {
    setSelectSize(v);
  };

  const handleAddToCart = () => {
    if (!selectSize) return;
    const item = JSON.parse(JSON.stringify(bodyItem));
    item.fields["price"] = selectSize.price;
    item.fields["size"] = selectSize.size;
    delete item.fields["sizes"];
    dispatch(addToCart({ product: item, quantity }));
  };

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

  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className={s.root}>
      <div className={s.image}>
        <Image
          loader={myLoader}
          src={bodyItem.fields.mainPhoto.fields.file.url}
          alt="thumbnails"
          objectFit="contain"
          layout="fill"
        ></Image>
      </div>
      <div className={s.content}>
        <div className={s.title}>{bodyItem.fields.title}</div>
        {/* <Price price={product.fields.price} s={s.product__price} /> */}
        <div
          className={s.desc}
          dangerouslySetInnerHTML={{ __html: bodyItem.fields.description }}
        ></div>
        <div className={s.select__size}>
          <CustomSelect
            options={bodyItem.fields.sizes.sizes}
            handleSelectOption={handleSelectOption}
            label={"Rozmiar"}
          ></CustomSelect>
          <div className={s.price}>
            <div className={s.title_price}>Cena</div>
            <div>
              {selectSize ? (
                <Price price={selectSize?.price} s={s.product__price} />
              ) : (
                <div className={s.empty__price}>-</div>
              )}{" "}
            </div>
          </div>
        </div>
        <div className={s.add__cart}>
          <div className={s.input__content}>
            <span
              className={s.quantity__changer}
              onClick={() => changeQuantity("dec")}
            >
              <FiMinus />
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
              <FiPlus />
            </span>
          </div>
          <button className={s.add__cart__btn} onClick={handleAddToCart}>
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
