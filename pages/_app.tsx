import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import { saveState } from "../store/browser-storage";

store.subscribe(() => {
  saveState(store.getState());
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
