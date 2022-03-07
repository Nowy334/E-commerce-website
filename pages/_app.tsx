import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import { saveState } from "../store/browser-storage";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

store.subscribe(() => {
  saveState(store.getState());
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <m.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </Provider>
  );
}
export default MyApp;
