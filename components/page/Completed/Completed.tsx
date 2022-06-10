import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useAppDispatch } from "../../../store/hooks";
import Cookie from "js-cookie";
import s from "./Completed.module.scss";
import Price from "components/functional/Price/Price";
import ProductsCart from "components/common/ProductsCart/ProductsCart";
import Image from "@ui/Image";

const Completed = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<any>();
  const orderId = router.query.orderId;
  useEffect(() => {
    setOrder(JSON.parse(Cookie.get("order") as string));
  }, []);

  console.log(order);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      Cookie.remove("order");
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const adress = order && (
    <div className={s.summary__info}>
      <span className={s.space}>
        <b>Adres wysyłki</b>
      </span>
      <span className={s.space__small}>
        {order.form.firstName + " " + order.form.lastName}
      </span>
      <span>{order.form.street}</span>
      <span>{order.form.postcode + ", " + order.form.city}</span>
      <span>{order.form.phoneNumber}</span>

      <span className={s.space}>
        <b>Informacje</b>
      </span>
      <span className={s.space__small}>
        Przewidywany czas realizacji: do 10 dni roboczych
      </span>
      <span>Wybrana forma dostawy: {" " + order.shipment.type}</span>
      <span>Wybrana forma płatności: Przelew tradycyjny</span>
    </div>
  );

  return (
    <>
      {order && (
        <div className={s.container}>
          <div className={s.summary__order}>
            <div className={s.summary__info}>
              <span>
                <b>Dziękujemy za złożenie zamówienia</b>
              </span>
              <span className={s.space}>
                Za chwilę otrzymasz e-mail z potwierdzeniem.
              </span>
              <span className={s.space}>
                Numer twojego zamówienia: <b>{orderId}</b>
              </span>
              <span className={s.price}>
                Całkowita wartość zakupów, wraz z kosztami wysyłki:
                <b>
                  <Price price={order.totalPrice} s={s.inline} />
                </b>
              </span>
              <span className={s.space}>
                <b>Prosimy o dokonanie przelewu na poniższe dane:</b> 14 1140
                2004 0000 3802 7796 9903
              </span>
              <span className={s.space}>
                Tytuł przelewu: zamówienie numer {orderId}
              </span>
              <span>Numer konta: 14 1140 2004 0000 3802 7796 9903</span>
              <span>“Katya” RG Leotards Katarzyna Dębska</span>
              <span>Ul. Pszczyńska 12D/5 43-190 Mikołów</span>
              <span className={s.space}>
                W razie jakichkolwiek pytań lub wątpliwości prosimy o kontakt
                e-mailowy - katya.rgleotards@gmail.com
              </span>
            </div>
            <div className={s.desktop}>{adress}</div>
          </div>
          <div className={s.order}>
            <span className={s.summary__title}>
              <b>Twoje zamówienie</b>
            </span>
            <ul className={s.list__items}>
              {order.cart.map((item: any, index: number) => {
                return (
                  <li key={index} className={s.cart__item}>
                    <div className={s.product__content}>
                      <div className={s.product__image}>
                        <Image
                          customLoader={true}
                          src={item.photo.url}
                          alt={item.title}
                          objectFit="cover"
                          layout="fill"
                        ></Image>
                      </div>
                      <div className={s.content__wrapper}>
                        <div className={s.product__title}>{item.title}</div>
                        <div>
                          {item?.color && (
                            <div className={s.product__properties}>
                              kolor: {item.color[0]}
                            </div>
                          )}
                          {!item?.color && !item?.size && (
                            <div className={s.product__properties}>
                              rozmiar: {item.title}
                            </div>
                          )}
                          {item?.size && (
                            <div className={s.product__properties}>
                              rozmiar: {item.size}
                            </div>
                          )}
                        </div>
                        <div className={s.mobile}>
                          <span className={s.quantity__mobile}>
                            {item.quantity} x{" "}
                          </span>
                          <Price price={item.price} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={s.isMobile + " " + s.summary__order}>{adress}</div>
        </div>
      )}
    </>
  );
};

export default Completed;
