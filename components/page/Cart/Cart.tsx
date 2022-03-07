import { useAppSelector } from "../../../store/hooks";
import s from "./Cart.module.scss";
import ProductsCart from "../../common/ProductsCart/ProductsCart";
import CartTotalPrice from "../../functional/CartTotalPrice/CartTotalPrice";
import Button from "../../ui/Button";
import Shipment from "../../functional/Shipment/Shipment";
import Price from "../../functional/Price/Price";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const totalPriceData = useAppSelector((state) => state.totalPrice);

  return (
    <div className={s.root}>
      {cartItems.length === 0 ? (
        <h1>Twoj koszyk jest pusty!</h1>
      ) : (
        <div className={s.container}>
          <div className={s.items}>
            <div className={s.headers}>
              <div>Produkt</div>
              <div className={s.mobile}>Cena</div>
              <div>Ilość</div>
              <div className={s.mobile}>Razem</div>
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
                <Price price={totalPriceData.shipment.price} />
              </div>
              <Shipment />
            </div>
            <div className={s.total__price}>
              <span>Suma</span>
              <CartTotalPrice
                view={s.total}
                shipment={totalPriceData.shipment.price}
              />
            </div>
            <Button
              path="/order"
              btnText="Przejdź do płatności"
              square={true}
              classname={
                s.btn + " " + (!totalPriceData.shipment.type ? s.disabled : "")
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
