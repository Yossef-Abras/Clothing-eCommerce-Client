import { NextUIProvider } from "@nextui-org/system";
import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/globals.css";
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <HomeLayout>
        <Component {...pageProps} />;
      </HomeLayout>
    </NextUIProvider>
  );
}
