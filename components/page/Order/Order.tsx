import { useAppSelector } from "../../../store/hooks";
import s from "./Order.module.scss";
import { useAppDispatch } from "../../../store/hooks";
import { removeAllFromCart } from "../../../store/cart.slice";
import { removeData } from "../../../store/form.slice";
import { removeShipmentData } from "../../../store/totalPrice.slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CartTotalPrice from "../../functional/CartTotalPrice/CartTotalPrice";
import Shipment from "../../functional/Shipment/Shipment";
import Price from "../../functional/Price/Price";
import Form from "../../functional/Form/Form";
import validateForm from "../../../helpers/validator";
import Cookie from "js-cookie";
import Button from "@ui/Button/Button";

interface cartItemsbody {
  title: string;
  color: string[];
  quantity: number;
  price: number;
  photo: string;
}

const Order = () => {
  const formItems = useAppSelector((state) => state.form);
  const cartItems = useAppSelector((state) => state.cart);
  const totalPriceData = useAppSelector((state) => state.totalPrice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: boolean }>();
  const [checked, setChecked] = useState(false);
  const [noCheckedInfo, setCheckedInfo] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (checked) {
      setCheckedInfo("");
    }
  }, [checked]);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    } else {
      router.prefetch("/completed");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validate = validateForm(formItems);
    setErrors(validate);
    for (const item in validate) {
      if (validate[item]) {
        return;
      }
    }

    if (!checked) {
      setCheckedInfo("*Pole jest wymagane");
      return;
    }

    const cartItemsArray = cartItems.map((el: any) => {
      return {
        title: el.fields.title,
        color: el.fields.color,
        quantity: el.quantity,
        price: el.fields.price,
        photo: el.fields.mainPhoto.fields.file,
        size: el.fields?.size,
      };
    });

    const body = {
      form: formItems,
      cart: cartItemsArray,
      totalPrice: totalPriceData.totalPrice,
      shipment: totalPriceData.shipment,
    };

    try {
      setLoader(true);
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
      Cookie.set("order", JSON.stringify(body));
      if (res.status === 200 && json.message === "success") {
        setLoader(false);
        router.push({
          pathname: "/order/completed",
          query: { orderId: json.orderNumber },
        });
        dispatch(removeData());
        dispatch(removeShipmentData());
        dispatch(removeAllFromCart());
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <>
      {cartItems.length === 0 ? null : (
        <div className={s.container}>
          <Form handleSubmit={handleSubmit} errors={errors} />
          <div className={s.summary}>
            <span className={s.cart__title}>Twoje zamówienie</span>
            <div className={s.cart__items}>
              {cartItems.map((el: any, i) => {
                return (
                  <div key={i} className={s.cart__text + " " + s.cart__item}>
                    <div className={s["cart__item--info"]}>
                      <div>
                        <span className={s["cart__item--title"]}>
                          {el.fields.title}
                        </span>
                        <span> x{el.quantity}</span>
                      </div>
                      <Price price={el.fields.price * el.quantity} />
                    </div>
                    <div>
                      <span className={s.cart__color}>
                        {el.fields.color && "kolor: "}
                        {el.fields.color &&
                          el.fields.color.map((item: any, i: number) => {
                            return <span key={i}>{item}</span>;
                          })}
                        {!el.fields.color && !el.fields?.size && (
                          <span>rozmiar: {el.fields.title}</span>
                        )}
                        {el.fields.size && (
                          <span>rozmiar: {el.fields.size}</span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={s.cart__summary__content}>
              <div className={s.cart__text}>
                <span>Kwota</span>
                <CartTotalPrice />
              </div>
              <div className={s.cart__text + " " + s.shimpent}>
                <span>Wysyłka</span>
                {/* <Price price={totalPriceData.shipment.price} /> */}
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
            <div className={s.payment + " " + s.cart__text}>
              Metoda płatności: przelew bankowy
            </div>
            <div className={s.agreements}>
              <div className={s.agreements__content}>
                <input
                  type="checkbox"
                  onChange={() => setChecked(!checked)}
                  checked={checked}
                />
                Akceptuję Regulamin i Politykę prywatności.*
              </div>
              {noCheckedInfo ? (
                <div className={s.checked__info}>{noCheckedInfo}</div>
              ) : null}
            </div>
            {/* <button
              type="submit"
              form="hook-form"
              className={s.btn}
              disabled={!totalPriceData.shipment.type ? true : false}
            >
              Kupuje i płacę
            </button> */}

            <Button
              classname={s.btn}
              type="submit"
              form="hook-form"
              btnText="Kupuje i płacę"
              disabled={!totalPriceData.shipment.type ? true : false}
              loader={loader}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
