import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Input, DropdownMenu, DropdownItem, Dropdown, DropdownTrigger } from "@nextui-org/react";
import { BsPerson } from "react-icons/bs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox } from "@nextui-org/react";
// import { MailIcon } from './MailIcon.jsx';
// import { LockIcon } from './LockIcon.jsx';

import { ImSearch } from "react-icons/im";
import Login from "./login";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(showInput => !showInput);
  };

  const menuItems = [
    "Profile",
    "Dashboard",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-white text-lg text-black shadow-md backdrop-blur-3xl backdrop-filter">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-orange-400 font-sans ">SARAMODA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                // className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                // endContent={icons.chevron}
                radius="sm"
                variant="light"
                href="/contacts"

              >
                Product
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
            // startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."

            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
            // startContent={icons.flash}
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
            // startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <NavbarItem>
          <Link href="#">
            Contacts
          </Link>
        </NavbarItem> */}
        <NavbarItem>
          <Link color="foreground" href="#">
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
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

