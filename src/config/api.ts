export const apiUrls = {
  GET_RAW_MATERIALS_STOCK_LIST: '/rawmaterials/listwithstock',
  GET_PRODUCTS_STOCK_LIST: '/products/listwithstock',
  GET_MONTHLY_ORDERS_TOTAL: '/orders/getMonthlyOrderTotalAndAmount?ts={ts}',
  GET_STOCK_HISTORY_LIST:
    '/stocks/stockhistorylist?stockid={stockid}&sortBy={sortBy}',
  GET_MONTHLY_PURCHASES_TOTAL_AMOUNT:
    '/purchases/getMonthlyPurchasesTotalAndAmount?ts={ts}',
  GET_OPEN_BATCHES: '/batches/getOpenBatches',
  GET_ACTIVE_PRODUCTS: '/products/getActiveProducts',
  GET_ACTIVE_CUSTOMERS: '/customers/getActiveCustomers',
  GET_LAST_ORDER_NO: '/orders/getLastOrderNo',
  SUBMIT_NEW_ORDER: '/orders/submitNewOrder',
  GET_ORDERS: '/orders/getOrders',
  GET_OPEN_PRODUCT_BATCHES: '/batches/getOpenProductBatches?prodid={prodid}',
  SUBMIT_NEW_DISPATCH: '/dispatches/submitNewDispatch',
  GET_ORDER_DETAILS: '/orders/getOrderDetails',
};
