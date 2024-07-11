import { RouteObject } from 'react-router-dom';
import OrdersComponent from '../../app/orders/Page';
import CreateNewOrder from '../../app/orders/neworder/CreateNewOrder';
import Dispatches from '../../app/orders/dispatches/Dispatches';
import ViewOrders from '../../app/orders/vieworders/ViewOrders';

export const homeRoutes: RouteObject[] = [
  {
    path: '/orders',
    element: <OrdersComponent />,
    children: [
      {
        path: 'neworder',
        element: <CreateNewOrder />,
      },
      {
        path: 'dispatches',
        element: <Dispatches />,
      },
      {
        path: 'vieworders',
        element: <ViewOrders />,
      },
    ],
  },
];
