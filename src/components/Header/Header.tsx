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
} from '@nextui-org/react';
import { Key } from 'react';
import SearchIcon from './_widgets/SearchIcon';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (key: Key) => {
    console.log('KEY', key);
    navigate(key as string);
  };

  return (
    <Navbar isBordered maxWidth="full" className="mb-2">
      <NavbarBrand>
        <Image
          isZoomed
          width={70}
          alt="NextUI Fruit Image with Zoom"
          src="../../../src/assets/logo1.png"
        />
        <p className="font-semibold text-lg text-default-700">
          Green Top Organics
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
              className="w-[340px]"
              itemClasses={{
                base: 'gap-4',
              }}
              onAction={(key) => handleNavigation(key)}
            >
              <DropdownItem
                key="orders/neworder"
                startContent={
                  <Image
                    width={30}
                    radius="none"
                    alt="Orders"
                    src="../../../src/assets/orders-cart.svg"
                    className="float-left"
                  />
                }
              >
                Orders
              </DropdownItem>
              <DropdownItem
                key="sales/taxinvoice"
                startContent={
                  <Image
                    width={30}
                    radius="none"
                    alt="Sales"
                    src="../../../src/assets/bill.svg"
                    className="float-left"
                  />
                }
              >
                Sales
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[20rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <h2 className="text-sm font-semibold text-slate-500 hover:text-slate-600">
          Rajesab Teli
        </h2>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Rajesab Teli"
              size="sm"
              src="../../../src/assets/profile.jpg"
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
