import s from "./Shipment.module.scss";
import { useAppSelector } from "../../../store/hooks";
import { FC } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setShipmentData } from "../../../store/totalPrice.slice";

const Shipment: FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  const shimpent = useAppSelector((state) => state.totalPrice);
  const dispatch = useAppDispatch();

  const handleData = (type: string, price: number) => {
    dispatch(setShipmentData({ type: type, price: price }));
  };

  return (
    <div className={s.radio__container}>
      <label className={s.radio}>
        <div>
          <input
            type="radio"
            value="Kurier Inpost"
            name="shipment"
            disabled={disabled}
            checked={shimpent.shipment.type === "Kurier Inpost"}
            onChange={() => handleData("Kurier Inpost", 10)}
          />
          Kurier Inpost
        </div>
        <span>10.00 zł</span>
      </label>
      <label className={s.radio}>
        <div>
          <input
            type="radio"
            value="Kurier DPD"
            name="shipment"
            disabled={disabled}
            checked={shimpent.shipment.type === "Kurier DPD"}
            onChange={() => handleData("Kurier DPD", 9.99)}
          />
          Kurier DPD
        </div>
        <span>9.99 zł</span>
      </label>
      <label className={s.radio}>
        <div>
          <input
            type="radio"
            value="Odbiór osobisty"
            name="shipment"
            disabled={disabled}
            checked={shimpent.shipment.type === "Odbiór osobisty"}
            onChange={() => handleData("Odbiór osobisty", 12)}
          />
          Odbiór osobisty
        </div>
        <span>12.00 zł</span>
      </label>
    </div>
  );
};

export default Shipment;
