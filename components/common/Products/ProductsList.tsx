import { FC } from "react";
import Product from "./Product";
import s from "./ProductList.module.scss";

const ProductsList: FC<{ products: any; type: string }> = ({
  products,
  type,
}) => {
  const productsList = products.map((item: any) => {
    return <Product key={item.sys.id} product={item} type={type} />;
  });
  return (
    <div>
      <ul className={s.list}>{productsList}</ul>;
    </div>
  );
};

export default ProductsList;
