import s from "./Shipment.module.scss";
import { FC } from "react";

const Shipment: FC<{ setShipment: (price: number, type: string) => void }> = ({
  setShipment,
}) => {
  return (
    <div className={s.radio__container}>
      <label className={s.radio}>
        <div>
          <input
            type="radio"
            value="Kurier Inpost"
            name="shipment"
            onClick={() => setShipment(10, "Kurier Inpost")}
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
            onClick={() => setShipment(9.99, "Kurier DPD")}
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
            onClick={() => setShipment(12, "Odbiór osobisty")}
          />
          Odbiór osobisty
        </div>
        <span>12.00 zł</span>
      </label>
    </div>
  );
};

export default Shipment;
