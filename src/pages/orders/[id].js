import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaShippingFast,
  FaPhoneAlt,
  FaDollarSign,
  FaCalendarDay,
  FaCheck,
  FaCreditCard,
  FaTrash,
} from "react-icons/fa";
import {
  cancelReturnOrderRequest,
  createReturnOrderRequest,
  getSpecificUserOrders,
} from "../../../public/global/order";
import { MdOutlinePendingActions } from "react-icons/md";

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxQuantityForSelectedProduct, setMaxQuantityForSelectedProduct] =
    useState(0);
  const [returnQuantity, setReturnQuantity] = useState(1);
  const [returnReason, setReturnReason] = useState("");
  const [returnRequests, setReturnRequests] = useState([]);
  const [returnReqLoading, setReturnReqLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const returnReasons = ["Defective", "Wrong Item", "Not Satisfied", "Other"];

  const fetchOrder = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleReturnClick = (item) => {
    setSelectedProduct({ ...item.product, size: item.size, color: item.color });
    setMaxQuantityForSelectedProduct(item.quantity);
    setReturnQuantity(1);
    setReturnReason("");
    onOpen();
  };

  const handleAddReturnRequest = () => {
    setReturnRequests([
      ...returnRequests,
      { ...selectedProduct, quantity: returnQuantity, reason: returnReason },
    ]);
    onClose();
  };

  const handleRemoveRequest = (index) => {
    setReturnRequests(returnRequests.filter((_, i) => i !== index));
  };

  const handelSendRequst = async () => {
    const returnItems = returnRequests.map((item) => ({
      product: { _id: item._id },
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      reason: item.reason,
    }));
    try {
      setReturnReqLoading(true);
      const result = await createReturnOrderRequest({
        orderId: id,
        returnItems,
      });
      setReturnRequests([]);
      fetchOrder();
    } catch (err) {
    } finally {
      setReturnReqLoading(false);
    }
  };

  const handelCancel = async (productData) => {
    try {
      setCancelLoading(true);
      const result = await cancelReturnOrderRequest(order.returnOrder._id, [
        productData,
      ]);
      fetchOrder();
    } catch {
    } finally {
      setCancelLoading(false);
    }
  };

  const isCanReturn = () => {
    const currentDate = new Date();
    const orderCreationDate = new Date(order.createdAt);
    const daysDifference = Math.floor(
      (currentDate - orderCreationDate) / (1000 * 60 * 60 * 24)
    );
    if (daysDifference < 30 && !order.returnOrder && order.isDelivered)
      return true;
    return false;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
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
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        Order Details
      </h1>
      <Card className="shadow-lg rounded-lg overflow-hidden bg-white mb-6 border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto mb-6">
              <tbody>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    <FaCalendarDay className="text-primary mr-2" />
                    Order ID:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {order._id}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    <FaShippingFast className="text-primary mr-2" />
                    Shipping Address:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {order.shippingAddress.details},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    <FaPhoneAlt className="text-primary mr-2" />
                    Phone:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {order.shippingAddress.phone}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    <FaDollarSign className="text-primary mr-2" />
                    Total Price:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    ${Number(order.totalOrderPrice).toFixed(2)} including tax of{" "}
                    {order.taxPrice}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    <FaCalendarDay className="text-primary mr-2" />
                    Created At:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    <FaCreditCard className="text-primary mr-2" />
                    Payment Method:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {order.paymentMethodType === "cash" ? "Cash" : "Card"}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    {order.isPaid ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <MdOutlinePendingActions className="text-gray-500 mr-2" />
                    )}
                    Paid:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {order.isPaid ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="flex items-center">
                  <td className="py-2 px-4 font-semibold text-gray-700 flex items-center min-w-max">
                    {order.isDelivered ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <MdOutlinePendingActions className="text-gray-500 mr-2" />
                    )}
                    Delivered:
                  </td>
                  <td className="py-2 px-4 text-gray-600 min-w-max">
                    {order.isDelivered ? "Yes" : "No"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Divider className="my-5" />
          <div className="mt-1">
            <h2 className="text-2xl font-bold text-primary">Products:</h2>
            <div className="flex flex-wrap gap-4 mt-5">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    router.push("/products/" + item.product._id);
                  }}
                  className="w-72 h-52"
                >
                  <Card
                    isHoverable
                    className="relative flex flex-row shadow-md border border-gray-200 rounded-lg h-full"
                  >
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg">
                      $
                      {item.priceAfterDiscount
                        ? item.priceAfterDiscount
                        : item.price}
                    </div>
                    <div className="w-28 flex items-center">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        objectFit="cover"
                        width="100%"
                        height={175}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-4">
                      <p className="text-lg font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Color: {item.color}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                      {isCanReturn() && (
                        <Button
                          className="min-w-fit mt-3 flex rounded-full bg-primary/20 justify-center items-center md:text-lg text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReturnClick(item);
                          }}
                        >
                          Return
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {order.returnOrder && order.returnOrder.returnItems && (
            <>
              <Divider className="my-5" />
              <div className="mt-1">
                <h2 className="text-2xl font-bold text-primary">
                  Returned Products:{" "}
                  {order.returnOrder.refundPaymentId &&
                    `(${order.returnOrder.refundAmount}$ refunded)`}
                </h2>
                {order.returnOrder &&
                order.returnOrder.returnItems.every(
                  (item) => item.status === "Refunded"
                ) ? (
                  <p className="text-sm text-yellow-500">
                    Refund processing may take up to 10 days from the date of
                    return acceptance.
                  </p>
                ) : (
                  <p className="text-sm text-yellow-500">
                    Please check your email if you still have any pending
                    requests.
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mt-5">
                  {order.returnOrder.returnItems.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => {
                        router.push("/products/" + item.product._id);
                      }}
                      className="w-72 h-52"
                    >
                      <Card
                        isHoverable
                        className="relative flex flex-row shadow-md border border-gray-200 rounded-lg h-full"
                      >
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg">
                          ${item.price}
                        </div>
                        <div className="w-28 flex items-center">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            objectFit="cover"
                            width="100%"
                            height={150}
                            className="rounded-t-lg"
                          />
                        </div>
                        <div className="flex flex-col p-4 justify-center">
                          <p className="text-lg font-medium text-gray-800">
                            {item.product.title}
                          </p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-gray-600">Color: {item.color}</p>
                          <p className="text-gray-600">Size: {item.size}</p>
                          <p className="text-gray-600">Status: {item.status}</p>
                          <p className="text-gray-600">
                            {item.status === "Pending"
                              ? "Created Date: " +
                                new Date(
                                  order.returnOrder.createdAt
                                ).toLocaleString()
                              : item.status === "Approved"
                              ? "Approval Date: " +
                                new Date(item.approvalDate).toLocaleString()
                              : item.status === "Rejected"
                              ? "Rejection Date: " +
                                new Date(item.rejectionDate).toLocaleString()
                              : "Refund Date: " +
                                new Date(item.refundDate).toLocaleString()}
                          </p>

                          {item.status === "Pending" && (
                            <Button
                              className="min-w-fit mt-3 flex rounded-full bg-primary/20 justify-center items-center md:text-lg text-black"
                              onClick={() =>
                                handelCancel({
                                  id: item.product._id,
                                  color: item.color,
                                  size: item.size,
                                })
                              }
                            >
                              {cancelLoading ? "Processing.." : "Cancel"}
                            </Button>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-row text-primary gap-3">
            <h2>Return Product</h2>
          </ModalHeader>
          <ModalBody>
            <p>Product Name: {selectedProduct?.title}</p>
            <div className="mb-4">
              <Select
                defaultSelectedKeys={returnReasons[0]}
                disallowEmptySelection={true}
                label="Return Reason"
                placeholder="Select a return reason"
                variant="bordered"
                onChange={(e) => setReturnReason(e.target.value)}
                className="max-w-xs"
              >
                {returnReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Input
              type="number"
              min="1"
              max={maxQuantityForSelectedProduct}
              value={returnQuantity}
              onChange={(e) => setReturnQuantity(Number(e.target.value))}
              placeholder="Return Quantity"
              fullWidth
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddReturnRequest} disabled={!returnReason}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {returnRequests && returnRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Returned Products Cart:
          </h2>
          <div className="flex flex-col gap-4">
            {returnRequests.map((item, index) => (
              <Card
                key={index}
                className="shadow-lg border border-gray-200 rounded-lg relative"
              >
                <button
                  onClick={() => handleRemoveRequest(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>

                <div className="p-4">
                  <p className="text-lg font-bold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Reason: {item.reason}</p>
                  <p className="text-gray-600">Color: {item.color}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                </div>
              </Card>
            ))}
          </div>
          <Button
            isDisabled={returnReqLoading}
            className="bg-primary text-white block mt-5 mx-auto"
            onClick={handelSendRequst}
          >
            {returnReqLoading ? "Sending.." : "Send Return Request"}
          </Button>
        </div>
      )}
    </div>
  );
}
