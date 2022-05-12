import { FC } from "react";
import ProductsList from "../../common/Products/ProductsList";
import s from "./Associations.module.scss";
import { useAppSelector } from "../../../store/hooks";
import Link from "next/link";
import Button from "@ui/Button/Button";

const Associations: FC<{ association: any; type: string }> = ({
  association,
  type,
}) => {
  const snippets = useAppSelector((state) => state.snippets);
  return (
    <div className={s.root}>
      {association.items ? (
        <ProductsList
          products={association.items}
          type={type}
          association={true}
        />
      ) : null}
      <div className={s.container}>
        <h2>Korony na kok</h2>
        <div className={s.desc}>
          Ozdoba do włosów na kok to błyszczący dodatek, który uzupełnia strój i
          sprawia, że każda gimnastyczka czuje się wyjątkowo.
        </div>
        <Button
          classname={s.btn}
          path={
            type === "ozdoby"
              ? "/korony-na-kok"
              : association.items.fields?.secondHand === true
              ? "/stroje-uzywane"
              : "/nowe-stroje"
          }
          btnText="sprawdź produkty"
        />
      </div>
    </div>
  );
};

export default Associations;
