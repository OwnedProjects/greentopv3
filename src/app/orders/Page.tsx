import { Button, Divider, Image } from '@nextui-org/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../config/routes/routeConstants';

const ordersMenu = [
  {
    menuTitle: 'New Order',
    menuIcon: '../../../src/assets/orders-cart.svg',
    path: `/orders/${ROUTE_CONSTANTS.NEW_ORDER}`,
  },
  {
    menuTitle: 'Dispatches',
    menuIcon: '../../../src/assets/truck.svg',
    path: `/orders/${ROUTE_CONSTANTS.DISPATCHES}`,
  },
  {
    menuTitle: 'View Orders',
    menuIcon: '../../../src/assets/checklist.svg',
    path: `/orders/${ROUTE_CONSTANTS.VIEW_ORDERS}`,
  },
  {
    menuTitle: 'Order Details',
    menuIcon: '../../../src/assets/details.svg',
    path: `/orders/${ROUTE_CONSTANTS.ORDER_DETAILS}`,
  },
];

const OrdersComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-4 items-center">
        {ordersMenu.map((x, i) => (
          <Button
            color="primary"
            size="sm"
            variant={`${x.path === location.pathname ? 'solid' : 'ghost'}`}
            radius="none"
            key={i}
            startContent={
              <Image
                width={20}
                radius="none"
                alt="New Order"
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

export default OrdersComponent;
