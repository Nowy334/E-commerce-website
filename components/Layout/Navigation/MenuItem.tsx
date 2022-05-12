import { SubMenu } from "../../../models/menuItem.model";
import classes from "./MenuItem.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuItems: React.FC<{
  name: string;
  path: string;
  submenu: SubMenu[] | undefined;
  isActive: boolean;
  disabled?: boolean;
  onCloseMenu: (arg: boolean) => void;
}> = ({ name, path, submenu, isActive, onCloseMenu, disabled = false }) => {
  const [active, setActive] = useState(false);
  const [innerWidth, setInnerWidth] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClick = () => {
    toggleDropDown();
    if (!submenu) {
      onCloseMenu(false);
    }
  };

  const toggleDropDown = () => {
    setActive(!active);
  };

  const sub = submenu?.map((el, index) => {
    return (
      <li
        className={classes.dropdown__item}
        key={index}
        onClick={() => onCloseMenu(false)}
      >
        <Link href={el.path}>{el.name}</Link>
      </li>
    );
  });

  const menuElemnt = (
    <a
      className={
        (disabled ? classes.disabled : null) +
        " " +
        (router.pathname === path ? classes.active : "")
      }
    >
      {name}
      {submenu ? (
        <div className={classes.arrow__wrapper}>
          <span
            className={
              classes.arrow +
              " " +
              (active && (innerWidth as number) < 900 ? classes.active : "")
            }
          >
            <span></span>
            <span></span>
          </span>
        </div>
      ) : (
        ""
      )}
    </a>
  );

  return (
    <li
      onClick={onClick}
      className={
        classes.menu__item +
        " " +
        (isActive ? classes.on : "") +
        " " +
        (submenu ? classes.submenu : "")
      }
    >
      {<Link href={path}>{menuElemnt}</Link>}
      {submenu ? (
        <ul className={classes.dropdown + " " + (active ? classes.on : "")}>
          {sub}
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default MenuItems;
