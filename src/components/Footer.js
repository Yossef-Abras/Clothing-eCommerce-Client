import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { BsEnvelopeAt } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-5 bg-[#eee] text-gray-800">
      <div className="flex flex-col gap-8 py-8">
        <div className="mb-4 w-full md:w-[40%]">
          <h1 className="text-lg font-bold text-primary">Saramoda</h1>
          <p>
            {
              "Discover the latest trends in women's fashion with our exclusive collection. From casual wear to elegant evening dresses, we offer high-quality clothing that combines style and comfort. Shop with us and elevate your wardrobe with our chic and trendy outfits."
            }
          </p>
        </div>
        <div className="flex flex-wrap mx-auto gap-20 px-10">
          <div className="flex flex-col flex-wrap content-center">
            <h2 className="font-bold text-primary">About</h2>
            <div>
              <Link href="about-us">About Us</Link>
            </div>
            <div>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
            <div>
              <Link href="/return-policy">Return Policy</Link>
            </div>
            <div>
              <Link href="/terms-of-service">Terms of Service</Link>
            </div>
            <div>
              <Link href="contact-us">Contact Us</Link>
            </div>
          </div>

          <div className="flex flex-col flex-wrap content-center gap-2">
            <h2 className="font-bold text-primary">Contact</h2>
            <div className="flex gap-1 items-center">
              <span>
                <IoLocationOutline />
              </span>
              <span>United States</span>
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
            <h2 className="font-bold text-primary">Social Media</h2>
            <div>
              <Link
                className="flex gap-1 items-center hover:text-primary"
                href="https://www.facebook.com/saramoda.29087?mibextid=ZbWKwL"
              >
                <FaFacebook />
                Follow us on Facebook
              </Link>
            </div>

            <div>
              <Link
                className="flex gap-1 items-center hover:text-primary"
                href="https://www.instagram.com/saramoda23"
              >
                <FaInstagram />
                Follow us on Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
