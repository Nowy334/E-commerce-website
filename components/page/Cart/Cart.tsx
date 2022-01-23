import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import s from "./Cart.module.scss";
import ProductsCart from "../../common/ProductsCart/ProductsCart";
import CartTotalPrice from "../../functional/CartTotalPrice/CartTotalPrice";
import Button from "../../ui/Button";
import Shipment from "../../functional/Shipment/Shipment";
import Price from "../../functional/Price/Price";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const [shipmentPrice, setShipmentPrice] = useState<number>(0);
  const [shipmentType, setShipmentType] = useState<string>();
  const [totalPrice, setTotalPrice] = useState<number>();

  const setShipment = (price: number, type: string) => {
    setShipmentPrice(price);
    setShipmentType(type);
  };

  const handleSetTotalPrice = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <div className={s.root}>
      {cartItems.length === 0 ? (
        <h1>Twoj koszyk jest pusty!</h1>
      ) : (
        <div className={s.container}>
          <div className={s.items}>
            <div className={s.headers}>
              <div>Produkt</div>
              <div>Cena</div>
              <div>Ilość</div>
              <div>Razem</div>
            </div>
            <ProductsCart products={cartItems} />
          </div>
          <div className={s.summary}>
            <span className={s.cart__title}>Podsumowanie koszyka</span>
            <div className={s.cart__summary__content}>
              <div className={s.cart__text}>
                <span>Kwota</span>
                <CartTotalPrice />
              </div>
              <div className={s.cart__text}>
                <span>Wysyłka</span>
                <Price price={shipmentPrice} />
              </div>
              <Shipment setShipment={setShipment} />
            </div>
            <div className={s.total__price}>
              <span>Suma</span>
              <CartTotalPrice
                view={s.total}
                shipment={shipmentPrice}
                setTotalPrice={handleSetTotalPrice}
              />
            </div>
            <Button
              path="/"
              btnText="Przejdź do płatności"
              square={true}
              classname={s.btn}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
