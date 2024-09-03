import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { BsEnvelopeAt } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="p-5 bg-[#eee]">
      <div className="flex flex-col gap-8 py-8">
        <div className="mb-4 w-full md:w-[40%]">
          <h1 className="text-lg font-bold text-orange-400">Saramoda</h1>
          <p>
            {
              "Discover the latest trends in women's fashion with our exclusive collection. From casual wear to elegant evening dresses, we offer high-quality clothing that combines style and comfort. Shop with us and elevate your wardrobe with our chic and trendy outfits."
            }
          </p>
        </div>
        <div className="flex flex-wrap mx-auto gap-20 px-10">
          <div className="flex flex-col flex-wrap content-center">
            <h2 className="font-bold text-orange-400 ">About</h2>
            <div>
              <Link href="about-us">About Us</Link>
            </div>
            <div>
              <Link
                href="/privacy-policy">
                Privacy Policy
              </Link>
            </div>
            <div>
              <Link
                href="/return-policy">
                Return & Exchange Policy
              </Link>
            </div>
            <div>
              <Link
                href="/terms-of-service">
                Terms of Service
              </Link>
            </div>
            <div>
              <Link href="contacy-us">Contact Us</Link>
            </div>
          </div>

          <div className="flex flex-col flex-wrap content-center gap-2">
            <h2 className="font-bold text-orange-400">Contact</h2>
            <div className="flex gap-1 items-center">
              <span>
                <IoLocationOutline />
              </span>
              <span>United State</span>
            </div>
            <div className="flex gap-1 items-center">
              <span>
                <BsEnvelopeAt />
              </span>
              <span>info@saramoda.shop</span>
            </div>
            <div className="flex gap-1 items-center">
              <span>
                <BsTelephone />
              </span>
              <span>+13136713399</span>
            </div>
          </div>

          <div className="flex flex-col flex-wrap content-center gap-2">
            <h2 className="font-bold text-orange-400">Social Media</h2>

            <div>
              <Link
                className="flex gap-1 items-center hover:text-orange-400"
                href="https://www.facebook.com/saramoda.29087?mibextid=ZbWKwL"
              >
                <FaFacebook />
                Follow us on facebook
              </Link>
            </div>

            <div>
              <Link
                className="flex gap-1 items-center hover:text-orange-400"
                href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fsaramoda23%3Figsh%3DOGd3OWd0bXBya2Iz%26fbclid%3DIwZXh0bgNhZW0CMTAAAR2d6yUB311zXSgyZ55qs-CvZSAqQEZ6SuM3RcN3He8c-UgzCxmjrZNMQOg_aem_LevmJBCjoOx5jhahVLubhw&h=AT3ka0YClUUOHGSwoHBxPEpZ3rlF5R300CW_PqqPMV7bdhvQOlbun19-KCzs9ELVvLMGmam2dNMImMjlplsCSj7NVBiRfvNDyeEABPJzuFkshuEESTPfhS8JZj3UIte-686xqQ"
              >
                <FaInstagram />
                Follow us on instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
