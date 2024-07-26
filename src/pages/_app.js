import HomeLayout from "../layouts/HomeLayout";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/system";
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    </NextUIProvider>
  );
}
