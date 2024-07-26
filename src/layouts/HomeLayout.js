import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
export default function HomeLayout({ children }) {
  return (
    <div>
      <MyNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
