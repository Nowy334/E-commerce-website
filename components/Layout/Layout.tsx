import Navbar from "./Navigation/Navbar";
import Footer from "./Footer";
import classes from "./Layout.module.scss";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navbar />
      <div className={classes.page__wrapper}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
