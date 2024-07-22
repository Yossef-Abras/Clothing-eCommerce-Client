// import { NextUIProvider } from "@nextui-org/system";
import Providers from "@/components/Providers";
import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <HomeLayout>
        <Component {...pageProps} />;
      </HomeLayout>
    </Providers>
  );
}
