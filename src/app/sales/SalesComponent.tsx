import { Button, Divider, Image } from "@heroui/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ROUTE_CONSTANTS } from "../../config/routes/routeConstants";

const salesMenu = [
  {
    menuTitle: "Tax Invoice",
    menuIcon: "../../../src/assets/bill.svg",
    path: `/sales/${ROUTE_CONSTANTS.TAX_INVOICE}`,
  },
];

const SalesComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-4 items-center">
        {salesMenu.map((x, i) => (
          <Button
            color="primary"
            size="sm"
            variant={`${x.path === location.pathname ? "solid" : "ghost"}`}
            radius="none"
            key={i}
            startContent={
              <Image
                width={20}
                radius="none"
                alt="Tax Invoice"
                src={x.menuIcon}
              />
            }
            onPress={() => navigate(x.path)}
          >
            {x.menuTitle}
          </Button>
        ))}
      </div>
      <Divider className="my-2" />
      <Outlet />
    </>
  );
};

export default SalesComponent;
