// import { NextUIProvider } from "@nextui-org/system";
import Providers from "@/components/Providers";
import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/globals.css";
<<<<<<< HEAD

=======
>>>>>>> 0b3519b58f7f70efe66ca04a390791b10fbc6c20
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <HomeLayout>
        <Component {...pageProps} />;
      </HomeLayout>
    </NextUIProvider>
  );
}
