import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { BsEnvelopeAt } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="p-5 bg-[#eee]">
      <div className="flex flex-col gap-8 py-8">
        <div className="mb-4 w-full md:w-[40%]">
          <h1 className="text-lg font-bold text-orange-400">Saramoda</h1>
          <p>
            test my file . this is website for sara moda aboutus and contactus
            ana all things you need this is website for sara moda aboutus and
            contactus ana all things you need
          </p>
        </div>
        <div className="flex flex-wrap mx-auto gap-20 px-10">
          <div className="flex flex-col flex-wrap content-center">
            <h2 className="font-bold text-orange-400 ">Browse</h2>
            <div>
              <Link href="">Home</Link>
            </div>
            <div>
              <Link href="">About Us</Link>
            </div>
            <div>
              <Link href="">Services</Link>
            </div>
            <div>
              <Link href="">Gallery</Link>
            </div>
            <div>
              <Link href="">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col flex-wrap content-center">
            <h2 className="font-bold text-orange-400">Services</h2>
            <p>Potions Development</p>
            <p>Automated Sunrises</p>
            <p>Witchcraft </p>
            <p>Potions Development</p>
            <p>Automated Sunrises</p>
          </div>
          <div className="flex flex-col flex-wrap content-center gap-2">
            <h2 className="font-bold text-orange-400">Contact</h2>
            <div className="flex gap-1 items-center">
              <span>
                <IoLocationOutline />
              </span>
              <span>Syria,Lattakia</span>
            </div>
            <div className="flex gap-1 items-center">
              <span>
                <BsEnvelopeAt />
              </span>
              <span>saramoda@gmail.com</span>
            </div>
            <div className="flex gap-1 items-center">
              <span>
                <BsTelephone />
              </span>
              <span>905-123-4532</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
