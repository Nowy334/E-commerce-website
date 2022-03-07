import { FC, useState, useEffect } from "react";
import s from "./InputQuantity.module.scss";
import { useAppDispatch } from "../../../store/hooks";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import {
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
} from "../../../store/cart.slice";

const InputQuantity: FC<{ product?: any; type?: string }> = ({
  product,
  type,
}) => {
  const dispatch = useAppDispatch();
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      dispatch(updateQuantity({ product, item: parseInt(event.target.value) }));
    }
  };
  return (
    <>
      {type !== "product" ? (
        <div key={product.quantity} className={s.input__wrapper}>
          <div className={s.input__content}>
            <span
              className={s.quantity__changer}
              onClick={() => dispatch(decrementQuantity(product))}
            >
              <FiMinus />
            </span>
            <input
              className={s.input}
              type="number"
              min="1"
              step="1"
              defaultValue={product.quantity}
              onBlur={(event) =>
                dispatch(
                  updateQuantity({
                    product,
                    item: parseInt(event.target.value),
                  })
                )
              }
              onKeyPress={handleKeyPress}
            />
            <span
              className={s.quantity__changer}
              onClick={() => dispatch(incrementQuantity(product))}
            >
              <FiPlus />
            </span>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default InputQuantity;
