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
import { useDispatch, useSelector } from "react-redux";
import { logout, sign } from "../store/userSlice";
export default function MyNavbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showInput, setShowInput] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(sign());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
  const handleButtonClick = () => {
    setShowInput((showInput) => !showInput);
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

        <NavbarBrand className={showInput ? 'hidden md:block' : ""}>
          <p className="text-lg font-bold text-orange-400  font-serif italic ">
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
      <NavbarContent justify="end" className="gap-2 md:gap-4">
        <NavbarItem>
          <Button
            className="flex rounded-full bg-orange-200 justify-center items-center w-10 h-10 md:text-lg text-black min-w-fit"
            onClick={handleButtonClick}
          >
            <ImSearch />
          </Button>
        </NavbarItem>
        <NavbarItem>
          {showInput && (
            <input
              className="max-w-full sm:max-w-[10rem] h-10 text-small font-normal text-default-500 bg-default-200/20 rounded-lg px-1"
              placeholder="Type to search..."
              size="sm"
            />
          )}
        </NavbarItem>
        <div className={(showInput && 'hidden md:flex') + " flex gap-2 md:gap-4"}>
          {!isLoggedIn ? <NavbarItem>
            <Login />
          </NavbarItem> : <NavbarItem>
            <Button
              onClick={handleLogout}
              className="flex rounded-full bg-orange-200 justify-center items-center w-10 h-10 md:text-lg text-black min-w-fit">
              <RiLogoutCircleRLine />
            </Button>
          </NavbarItem>}
          {isLoggedIn && (<NavbarItem>
            <Button onClick={() => router.push("/cart")} className="flex rounded-full bg-orange-200 justify-center items-center w-10 h-10 md:text-lg text-black min-w-fit">
              <TfiShoppingCartFull />
            </Button>
          </NavbarItem>)}
        </div>

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
