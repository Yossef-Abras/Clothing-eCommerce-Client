import { Provider } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/system";
import store from "../store/store";
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <HomeLayout>
          <Component {...pageProps} />
        </HomeLayout>
      </Provider>
    </NextUIProvider>
  );
}
