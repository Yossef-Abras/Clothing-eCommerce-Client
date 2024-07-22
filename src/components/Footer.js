import Link from "next/link";
// import { BsEnvelopeAt } from "react-icons/bs";
// import { IoLocationOutline } from "react-icons/bs";
// import { BsTelephone } from "react-icons/bs";
export default function Footer() {
  return (
    <footer class="p-5 bg-[#eee]">
      <div class=" footer container mx-auto">
        <div>
          <h1 class="font-bold text-orange-400">Sara moda</h1>
          <p>test my file . this is website for sara moda aboutus and contactus ana all things you need
            this is website for sara moda aboutus and contactus ana all things you need
          </p>
        </div>
        <div class="flex flex-col flex-wrap content-center" >
          <h2 class="font-bold text-orange-400 ">Browse</h2>
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
        <div class="flex flex-col flex-wrap content-center">
          <h2 class="font-bold text-orange-400">Services</h2>
          <p>Potions Development</p>
          <p>Automated Sunrises</p>
          <p>Witchcraft </p>
          <p>Potions Development</p>
          <p>Automated Sunrises</p>
        </div>
        <div class="flex flex-col flex-wrap content-center">
          <h2 class="font-bold text-orange-400">Contact</h2>
          <div>
            {/* <span><IoLocationOutline /></span> */}
            <span>Syria,Lattakia</span>
          </div>
          <div>
            {/* <span><BsEnvelopeAt /></span> */}
            <span>saramoda@gmail.com</span>
          </div>
          <div>
            {/* <span><BsTelephone /></span> */}
            <span>905-123-4532</span>
          </div>
        </div>
      </div>
    </footer>
  )

}
