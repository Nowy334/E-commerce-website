import Price from "../Price/Price";
import { useAppSelector } from "../../../store/hooks";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setTotalPriceData } from "../../../store/totalPrice.slice";

const CartTotalPrice: FC<{
  view?: string;
  shipment?: number;
  setTotalPrice?: (price: number) => void;
}> = ({ view, shipment, setTotalPrice }) => {
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (accumulator: any, item: any) =>
        accumulator + item.quantity * item.fields.price,
      0
    );
  };

  useEffect(() => {
    if (setTotalPrice) {
      setTotalPrice(getTotalPrice() + shipment);
    }
    dispatch(setTotalPriceData({ value: getTotalPrice() }));
  }, [cartItems]);

  return (
    <Price
      s={view}
      price={shipment ? getTotalPrice() + shipment : getTotalPrice()}
    />
  );
};

export default CartTotalPrice;
