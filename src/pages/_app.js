import HomeLayout from "@/layouts/HomeLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <HomeLayout>
      <Component {...pageProps} />;
    </HomeLayout>
  );
}
