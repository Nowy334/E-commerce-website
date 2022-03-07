import { FC } from "react";
import s from "./Header.module.scss";

const Header: FC<{ title: string }> = ({ title }) => {
  return <h1 className={s.header}>{title}</h1>;
};

export default Header;
