import React, { useState } from 'react';

type MenuItem = {
  label: string;
  href?: string;
  submenu?: MenuItem[];
};

type CustomNavbarProps = {
  menuItems: MenuItem[];
};

const CustomNavbar: React.FC<CustomNavbarProps> = ({ menuItems }) => {
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleMenuEnter = (label: string) => {
    setMenuOpen({ ...menuOpen, [label]: true });
  };

  const handleMenuLeave = (label: string) => {
    setMenuOpen({ ...menuOpen, [label]: false });
  };

  const handleSubmenuEnter = (label: string) => {
    setSubmenuOpen({ ...submenuOpen, [label]: true });
  };

  const handleSubmenuLeave = (label: string) => {
    setSubmenuOpen({ ...submenuOpen, [label]: false });
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.label} className="relative group">
        <a
          href={item.href}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onMouseEnter={() => handleMenuEnter(item.label)}
          onMouseLeave={() => handleMenuLeave(item.label)}
        >
          {item.label}
        </a>
        {item.submenu && menuOpen[item.label] && (
          <div
            className="origin-top-left absolute left-full top-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            onMouseEnter={() => handleSubmenuEnter(item.label)}
            onMouseLeave={() => handleSubmenuLeave(item.label)}
          >
            <div className="py-1">{renderMenuItems(item.submenu)}</div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {renderMenuItems(menuItems)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
