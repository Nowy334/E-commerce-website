import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import { saveState } from "../store/browser-storage";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Head from "next/head";

store.subscribe(() => {
  saveState(store.getState());
});

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return (
    <>
      <Head>
        <title>Stroje do gimnastyki artystycznej Katya RG Leotards</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <meta
          name="description"
          content={
            "Stroje do gimnastyki artystycznej, łyżwiarstwa i akrobatyki powietrznej. Szyjemy na zamówienie, oferujemy gotowe stroje na sprzedaż."
          }
        />
        <meta
          property="og:title"
          content={"Stroje do gimnastyki artystycznej Katya RG Leotards"}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={
            "Stroje do gimnastyki artystycznej, łyżwiarstwa i akrobatyki powietrznej. Szyjemy na zamówienie, oferujemy gotowe stroje na sprzedaż."
          }
          key="ogdesc"
        />
      </Head>
      <Provider store={store}>
        {/* <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter>
            <m.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            > */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </m.div>
          </AnimatePresence>
        </LazyMotion> */}
      </Provider>
    </>
  );
}
export default MyApp;
