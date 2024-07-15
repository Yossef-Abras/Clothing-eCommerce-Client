import { NextUIProvider } from "@nextui-org/system";
import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/globals.css";
import Providers from "@/providers";


export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <HomeLayout>
        <Component {...pageProps} />;
      </HomeLayout>
    </Providers>
  );
}
