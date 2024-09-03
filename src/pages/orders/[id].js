import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Divider, Image, Spinner } from "@nextui-org/react";
import {
  FaShippingFast,
  FaPhoneAlt,
  FaDollarSign,
  FaCalendarDay,
  FaCheck,
  FaTimes,
  FaCreditCard,
} from "react-icons/fa";
import { getSpecificUserOrders } from "../../../public/global/order";
import { MdOutlinePendingActions } from "react-icons/md";

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchOrder = async () => {
        try {
          const ordersResponse = await getSpecificUserOrders(id);
          setOrder(ordersResponse.data);
        } catch (error) {
          console.error("Failed to fetch order details", error);
          localStorage.setItem(
            "alertMessage",
            JSON.stringify({
              message: error.message || "Unknown error!!",
              isError: true,
            })
          );
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-400">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-orange-400 text-center">
        Order Details
      </h1>
      <Card className="shadow-lg rounded-lg overflow-hidden bg-white mb-6 border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto mb-6">
              <tbody>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    <FaCalendarDay className="text-orange-500 mr-2" />
                    Order ID:
                  </td>
                  <td className="py-2 px-4 text-gray-600">{order._id}</td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    <FaShippingFast className="text-orange-500 mr-2" />
                    Shipping Address:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {order.shippingAddress.details},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    <FaPhoneAlt className="text-orange-500 mr-2" />
                    Phone:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {order.shippingAddress.phone}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    <FaDollarSign className="text-orange-500 mr-2" />
                    Total Price:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    ${order.totalOrderPrice}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    <FaCalendarDay className="text-orange-500 mr-2" />
                    Created At:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    <FaCreditCard className="text-orange-500 mr-2" />
                    Payment Method:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {order.paymentMethodType === "cash" ? "Cash" : "Card"}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    {order.isPaid ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <MdOutlinePendingActions className="text-gray-500 mr-2" />
                    )}
                    Paid:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {order.isPaid ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center">
                    {order.isDelivered ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <MdOutlinePendingActions className="text-gray-500 mr-2" />
                    )}
                    Delivered:
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {order.isDelivered ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Divider />
          <div className="mt-1">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">
              Products:
            </h2>
            <div className="flex flex-wrap gap-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    router.push("/products/" + item.product._id);
                  }}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <Card
                    isHoverable
                    className="relative flex flex-row shadow-md border border-gray-200 rounded-lg"
                  >
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      ${item.price}
                    </div>
                    <div className="w-28">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        objectFit="cover"
                        width="100%"
                        height={150}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="flex flex-col p-4">
                      <p className="text-lg font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Color: {item.color}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
