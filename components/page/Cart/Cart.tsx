import { useAppSelector } from "../../../store/hooks";
import s from "./Cart.module.scss";
import ProductsCart from "../../common/ProductsCart/ProductsCart";
import CartTotalPrice from "../../functional/CartTotalPrice/CartTotalPrice";
import Button from "@ui/Button/Button";
import Shipment from "../../functional/Shipment/Shipment";
import Price from "../../functional/Price/Price";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const totalPriceData = useAppSelector((state) => state.totalPrice);

  return (
    <>
      {cartItems.length === 0 ? (
        <h1 className={s.empty}>Twój koszyk jest pusty!</h1>
      ) : (
        <div className={s.container}>
          <div className={s.items}>
            <div className={s.header__title}>Zawartość Twojego koszyka</div>
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
              <div className={s.cart__text + " " + s.cart__text_shipment}>
                <span>Wysyłka</span>
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
    </>
  );
};

export default Cart;
