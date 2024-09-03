import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { FaDollarSign, FaCalendarDay, FaCheck } from "react-icons/fa";
import { getUserOrders } from "../../../public/global/order";
import Link from "next/link";
import { MdOutlinePendingActions } from "react-icons/md";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const ordersResponse = await getUserOrders();
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-400">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-1 text-orange-400">Your Orders</h1>
      <p className="text-xs text-gray-400 pl-1">
        Click on order item to show details
      </p>
      {orders.length > 0 ? (
        <div className="flex flex-col gap-1 mt-8">
          {orders.map((order) => (
            <Link key={order._id} href={`/orders/${order._id}`} passHref>
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer">
                <div className="flex items-center">
                  <FaCalendarDay className="text-orange-500 mr-2" />
                  <span className="font-semibold text-gray-700">ID:</span>
                  <span className="ml-2 text-gray-600">{order._id}</span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="text-orange-500 mr-2" />
                  <span className="font-semibold text-gray-700">Price:</span>
                  <span className="ml-2 text-gray-600">
                    ${order.totalOrderPrice}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCalendarDay className="text-orange-500 mr-2" />
                  <span className="font-semibold text-gray-700">
                    Created At:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">Paid:</span>
                  {order.isPaid ? (
                    <FaCheck className="text-green-500 ml-2" />
                  ) : (
                    <MdOutlinePendingActions className="text-gray-500 ml-2" />
                  )}
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Delivered:
                  </span>
                  {order.isDelivered ? (
                    <FaCheck className="text-green-500 ml-2" />
                  ) : (
                    <MdOutlinePendingActions className="text-gray-500 ml-2" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">
          No orders available.
        </p>
      )}
    </div>
  );
}
