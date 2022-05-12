import { FC, useMemo } from "react";
import Product from "./Product";
import s from "./ProductList.module.scss";

const ProductsList: FC<{
  products: any;
  type?: string;
  association?: boolean;
}> = ({ products, type, association = false }) => {
  const productsList = useMemo(
    () =>
      products.map((item: any) => {
        return (
          <Product
            key={item.sys.id}
            product={item}
            type={type as string}
            association={association}
          />
        );
      }),
    [products, association, type]
  );
  return (
    <div className={association ? s.association__scroll : ""}>
      <ul className={s.list + " " + (association ? s.association : "")}>
        {productsList}
      </ul>
    </div>
  );
};

export default ProductsList;
