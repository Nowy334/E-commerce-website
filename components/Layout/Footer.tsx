import Link from "next/link";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        <p>&copy;Copyright {new Date().getUTCFullYear()} Katya RG Leotards</p>
        <Link href="/polityka-prywatnosci">
          <a>Polityka prywatności</a>
        </Link>
      </div>
      <div></div>
    </footer>
  );
};

export default Footer;
