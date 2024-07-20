import { RouteObject } from 'react-router-dom';
import OrdersComponent from '../../app/orders/Page';
import CreateNewOrder from '../../app/orders/neworder/CreateNewOrder';
import Dispatches from '../../app/orders/dispatches/Dispatches';
import ViewOrders from '../../app/orders/vieworders/ViewOrders';
import OrderDetails from '../../app/orders/orderdetails/OrderDetails';
import { ROUTE_CONSTANTS } from './routeConstants';
import SalesComponent from '../../app/sales/SalesComponent';
import TaxInvoice from '../../app/sales/taxinvoice/TaxInvoice';

export const homeRoutes: RouteObject[] = [
  {
    path: ROUTE_CONSTANTS.ORDERS,
    element: <OrdersComponent />,
    children: [
      {
        path: ROUTE_CONSTANTS.NEW_ORDER,
        element: <CreateNewOrder />,
      },
      {
        path: ROUTE_CONSTANTS.DISPATCHES,
        element: <Dispatches />,
      },
      {
        path: ROUTE_CONSTANTS.VIEW_ORDERS,
        element: <ViewOrders />,
      },
      {
        path: ROUTE_CONSTANTS.ORDER_DETAILS,
        element: <OrderDetails />,
      },
    ],
  },
  {
    path: ROUTE_CONSTANTS.SALES,
    element: <SalesComponent />,
    children: [
      {
        path: ROUTE_CONSTANTS.TAX_INVOICE,
        element: <TaxInvoice />,
      },
    ],
  },
];
