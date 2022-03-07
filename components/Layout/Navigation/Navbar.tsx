import classes from "./Navbar.module.scss";
import logo from "../../../public/assets/logo.png";
import { MenuItemsList } from "../../../data/menu";
import MenuItem from "./MenuItem";
import { useState, useRef, useEffect } from "react";
import { BsFacebook, BsInstagram } from "react-icons/Bs";
import { CgShoppingCart } from "react-icons/Cg";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicCartTotalPrice = dynamic(
  () => import("../../functional/CartTotalPrice/CartTotalPrice"),
  { ssr: false }
);

const Navbar = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (active && ref.current && !ref.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [active]);

  const activeHamburger = () => {
    setActive(!active);
  };

  const onCloseMenu = (status: boolean) => {
    setActive(status);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper} ref={ref}>
        <div className={classes.logo}>
          <Link href="/">
            <a>
              <img src={logo.src} alt="logo" width="66" height="79" />
            </a>
          </Link>
        </div>
        <ul
          className={
            classes.list__elements +
            " " +
            (active ? classes["navigation--active"] : "")
          }
        >
          {MenuItemsList.map((item, index) => {
            return (
              <MenuItem
                key={index}
                name={item.name}
                path={item.path}
                submenu={item.submenu}
                isActive={active}
                onCloseMenu={onCloseMenu}
              />
            );
          })}
        </ul>

        <button
          className={
            classes.hamburger +
            " " +
            (active ? classes["hamburger--active"] : "")
          }
          onClick={activeHamburger}
        >
          <span className={classes.hamburger__box}>
            <span className={classes.hamburger__inner}></span>
          </span>
        </button>
        <div className={classes.social__media}>
          <BsFacebook
            size="23"
            className={classes.icon + " " + classes.icon__fb}
          />
          <BsInstagram
            size="23"
            className={classes.icon + " " + classes.icon__insta}
          />
          <Link href="/cart">
            <a className={classes.cart}>
              <CgShoppingCart
                size="23"
                className={classes.icon + " " + classes.icon__cart}
              />
              <DynamicCartTotalPrice view={classes.price} />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
