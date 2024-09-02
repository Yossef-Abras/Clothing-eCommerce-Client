import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Login from "./login";
import { ImSearch } from "react-icons/im";
import { useRouter } from "next/router";
import Link from "next/link";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
export default function MyNavbar({ loginUserState, onLogin, onLogout }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(loginUserState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    onLogout();
  };

  const menuItems = {
    products: "Products",
    "about-us": "About us",
    "contact-us": "Contact us",
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className=" bg-white text-lg text-black shadow-md backdrop-blur-3xl backdrop-filter"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarBrand>
          <p
            onClick={() => {
              router.replace("/");
            }}
            className="text-lg font-bold text-orange-400  font-serif italic cursor-pointer"
          >
            SARAMODA
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className={
              router.pathname.slice(1) === "products"
                ? `text-orange-400 font-bold`
                : `text-black`
            }
            href="/products"
          >
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={
              router.pathname.slice(1) === "contact-us"
                ? `text-orange-400 font-bold`
                : `text-black`
            }
            href="/contact-us"
          >
            Contacts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={
              router.pathname.slice(1) === "about-us"
                ? `text-orange-400 font-bold`
                : `text-black`
            }
            href="/about-us"
          >
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-4 md:gap-6">
        {isLoggedIn && (
          <>
            <NavbarItem>
              <Button
                onClick={() => router.push("/cart")}
                className="flex rounded-full bg-orange-200 justify-center items-center w-10 h-10 md:text-lg text-black min-w-fit"
              >
                <TfiShoppingCartFull />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => router.push("/favorite")}
                className="flex rounded-full bg-orange-200 justify-center items-center w-10 h-10 md:text-lg text-black min-w-fit"
              >
                <MdFavorite />
              </Button>
            </NavbarItem>
          </>
        )}
        {!isLoggedIn ? (
          <NavbarItem>
            <Login
              onSuccess={() => {
                setIsLoggedIn(true);
                onLogin();
              }}
            />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              onClick={handleLogout}
              className="flex rounded-full bg-orange-200 justify-center items-center w-10 h-10 md:text-lg text-black min-w-fit"
            >
              <RiLogoutCircleRLine />
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {Object.keys(menuItems).map((key) => (
          <NavbarMenuItem key={key}>
            <Link
              className={
                router.pathname.slice(1) === key
                  ? `text-orange-400 font-bold`
                  : `text-black`
              }
              href={key}
              size="lg"
            >
              {menuItems[key]}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
