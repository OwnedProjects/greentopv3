import {
  getKeyValue,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { OpenOrderType } from "../_services/fetchAllOrders";
import { useNavigate } from "react-router";
import { ROUTE_CONSTANTS } from "../../../../config/routes/routeConstants";

type ViewAllOrdersTableProps = {
  allOrders: [] | OpenOrderType[] | undefined;
};
const ViewAllOrdersTable = ({ allOrders }: ViewAllOrdersTableProps) => {
  const navigate = useNavigate();

  const quantity = allOrders?.reduce(
    (x, curr) => x + parseFloat(curr.quantity),
    0
  );

  const handleOrderDetails = (ono: string) => {
    console.log("Order No", ono);
    navigate("/orders/" + ROUTE_CONSTANTS.ORDER_DETAILS, {
      state: { oNo: ono },
    });
  };

  return (
    <>
      <div className="pt-2">
        {quantity ? (
          <div className="text-right pb-2 text-sm font-bold text-gray-500 mr-5 pr-5">
            Total Quantity:{" "}
            <span className="text-purple-600 underline">
              {quantity?.toFixed(3)}
            </span>{" "}
            Tons
          </div>
        ) : (
          ""
        )}
        <Table aria-label="View All Orders Table" radius="none" removeWrapper>
          <TableHeader>
            <TableColumn key="orderdate">Order Date</TableColumn>
            <TableColumn key="orderno">Order No.</TableColumn>
            <TableColumn key="custname">Customer</TableColumn>
            <TableColumn key="name">Product</TableColumn>
            <TableColumn key="quantity" className="text-right">
              Quantity
            </TableColumn>
            <TableColumn key="status">Order Status</TableColumn>
          </TableHeader>
          <TableBody items={allOrders} emptyContent={"No Orders to display."}>
            {(item) => (
              <TableRow key={item?.orderid}>
                {(columnKey) =>
                  columnKey !== "quantity" ? (
                    columnKey === "orderno" ? (
                      <TableCell className="min-w-28 capitalize">
                        <Link
                          underline="hover"
                          className="cursor-pointer"
                          onClick={() => handleOrderDetails(item.orderno)}
                        >
                          {getKeyValue(item, columnKey)}
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell className="min-w-28 capitalize">
                        {getKeyValue(item, columnKey)}
                      </TableCell>
                    )
                  ) : (
                    <TableCell className="min-w-15 capitalize text-right">
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  )
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ViewAllOrdersTable;
