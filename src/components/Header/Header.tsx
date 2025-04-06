import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Key } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "./_widgets/SearchIcon";

// ✅ Recommended: import images instead of relative path strings
import logo from "../../assets/logo1.png";
import profileImg from "../../assets/profile.jpg";
import ordersIcon from "../../assets/orders-cart.svg";
import billIcon from "../../assets/bill.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (key: Key) => {
    console.log("KEY", key);
    navigate(key as string);
  };

  return (
    <Navbar isBordered maxWidth="full" className="mb-2">
      <NavbarBrand className="gap-3">
        <Image isZoomed width={70} alt="Logo" src={logo} />
        <p className="font-semibold text-xl text-default-700">
          Green Top Organics
        </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Accounts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Reports
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Link color="foreground" className="cursor-pointer">
                Home
              </Link>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[300px]"
              itemClasses={{
                base: "gap-4",
              }}
              onAction={handleNavigation}
            >
              <DropdownItem
                key="orders/neworder"
                startContent={
                  <Image
                    width={30}
                    radius="none"
                    alt="Orders"
                    src={ordersIcon}
                  />
                }
              >
                Orders
              </DropdownItem>
              <DropdownItem
                key="sales/taxinvoice"
                startContent={
                  <Image width={30} radius="none" alt="Sales" src={billIcon} />
                }
              >
                Sales
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-4" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-sm",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        <div className="flex flex-col items-end leading-tight">
          <span className="text-sm font-semibold text-slate-700">Rajesab</span>
          <span className="text-sm font-semibold text-slate-700">Teli</span>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Rajesab Teli"
              size="sm"
              src={profileImg}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="ChangeAddresss" color="secondary">
              Change Address
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
