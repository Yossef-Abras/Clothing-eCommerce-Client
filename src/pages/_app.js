import { Provider } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/system";
import store from "../store/store";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <HomeLayout className={`${bebas.className} bebas-font`}>
          <Component {...pageProps} />
        </HomeLayout>
      </Provider>
    </NextUIProvider>
  );
}
