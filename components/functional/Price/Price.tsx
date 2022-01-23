import { FC } from "react";

const Price: FC<{ price: number; s?: string }> = ({ price, s }) => {
  const floatPrice = price.toFixed(2);
  return <div className={s}>{`${floatPrice} zł`}</div>;
};

export default Price;
