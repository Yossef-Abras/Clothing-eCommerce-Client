import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Login from "./login";
import Image from "next/image";

export default function MyNavbar({ loginUserState, onLogin, onLogout }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(loginUserState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    onLogout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const menuItems = {
    products: "Products",
    "about-us": "About us",
    "contact-us": "Contact us",
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="flex gap-2 items-center">
          {/* Mobile menu toggle with icons */}
          <button onClick={handleMenuToggle} className="sm:hidden rounded-full">
            {isMenuOpen ? (
              <IoMdClose className="w-6 h-6 text-gray-800" />
            ) : (
              <IoMdMenu className="w-6 h-6 text-gray-800" />
            )}
          </button>
          <Image
            src={"/img/logo.png"}
            height={1000}
            width={1000}
            alt="saramoda logo"
            className="w-14 h-14 drop-shadow-[0_6px_7px_rgba(0,0,0,0.20)]"
          />
          <p
            onClick={() => router.push("/")}
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            SARAMODA
          </p>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden text-lg sm:flex gap-4">
          {Object.keys(menuItems).map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              className={
                router.pathname.slice(1) === key
                  ? `text-primary font-bold`
                  : `text-black`
              }
            >
              {menuItems[key]}
            </Link>
          ))}
        </div>

        {/* Cart, Favorites, Logout/Login */}
        <div className="flex items-center md:gap-4 gap-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/cart")}
                className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full text-primary hover:bg-primary hover:text-white"
              >
                <TfiShoppingCartFull />
              </button>
              <button
                onClick={() => router.push("/favorite")}
                className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full text-primary hover:bg-primary hover:text-white"
              >
                <MdFavorite />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full text-primary hover:bg-primary hover:text-white"
              >
                <RiLogoutCircleRLine />
              </button>
            </>
          ) : (
            <Login
              onSuccess={() => {
                setIsLoggedIn(true);
                onLogin();
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white/65 backdrop-blur-md shadow-md absolute top-16 w-full z-50">
          <ul className="flex flex-col gap-2 p-4">
            {Object.keys(menuItems).map((key) => (
              <li key={key}>
                <button
                  onClick={() => handleLinkClick(`/${key}`)}
                  className={
                    router.pathname.slice(1) === key
                      ? `text-primary font-bold`
                      : `text-black`
                  }
                >
                  {menuItems[key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
