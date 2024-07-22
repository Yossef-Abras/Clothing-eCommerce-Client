import React, { useState } from "react";
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
export default function MyNavbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showInput, setShowInput] = useState(false);

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
        <NavbarBrand>
          <p className="text-lg font-bold text-orange-400 font-sans ">
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
      <NavbarContent justify="end">
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
              className="max-w-full sm:max-w-[10rem] h-10 text-small font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
              placeholder="Type to search..."
              size="sm"
            />
          )}
        </NavbarItem>
        <NavbarItem>
          <Login />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {Object.keys(menuItems).map((key) => (
          <NavbarMenuItem key={key}>
            <Link className="w-full" href={key} size="lg">
              {menuItems[key]}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
