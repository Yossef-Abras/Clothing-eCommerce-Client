import { useEffect, useState } from "react";
import { Button, Spinner, Input, Select, SelectItem } from "@nextui-org/react";
import { getCart } from "../../public/global/cart";
import { createCheckoutSession } from "../../public/global/order";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { TbLogs } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";

export default function CartSellers() {
  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("Priority");
  const [shippingAddress, setShippingAddress] = useState({
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  });
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartId(cart.data._id);
        setCart(cart.data.cartItems);
        setTotalCartPrice(
          cart.data?.totalPriceAfterDiscount || cart.data.totalCartPrice
        );
      } catch (error) {
        console.error("Failed to fetch cart", error);
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
    fetchCart();
  }, []);

  useEffect(() => {
    // Calculate shipping cost based on method and total cart price
    if (shippingMethod === "Express") {
      setShippingCost(30);
    } else if (shippingMethod === "Overnight") {
      setShippingCost(15);
    } else if (shippingMethod === "Priority") {
      if (totalCartPrice > 100) {
        setShippingCost(0);
      } else {
        setShippingCost(5);
      }
    }
  }, [shippingMethod, totalCartPrice]);

  const handleCartUpdate = (totalCartPrice, updatedCart) => {
    setCart(updatedCart);
    setTotalCartPrice(totalCartPrice);
  };

  const isShippingAddressComplete = () => {
    return (
      shippingAddress.details &&
      shippingAddress.phone &&
      shippingAddress.city &&
      shippingAddress.postalCode
    );
  };

  const handleCheckout = async () => {
    if (!isShippingAddressComplete()) {
      localStorage.setItem(
        "alertMessage",
        JSON.stringify({
          message: "Please fill in all required shipping details.",
          isError: true,
        })
      );
      return;
    }

    setCheckoutLoading(true);
    setOrderSuccess(false);
    try {
      if (paymentMethod === "cash") {
        // const cashOrderResponse = await createCashOrder(
        //   cartId,
        //   shippingAddress
        // );
        // if (cashOrderResponse.status === "success") {
        //   setOrderSuccess(true);
        //   router.push("/orders");
        // }
      } else {
        const sessionResponse = await createCheckoutSession(
          cartId,
          shippingAddress,
          shippingMethod
        );

        if (sessionResponse.url) {
          setOrderSuccess(true);
          window.location.href = sessionResponse.url;
        } else {
          localStorage.setItem(
            "alertMessage",
            JSON.stringify({
              message: "Failed to create checkout session or URL is missing",
              isError: true,
            })
          );
        }
      }
    } catch (error) {
      localStorage.setItem(
        "alertMessage",
        JSON.stringify({
          message: error.message || "Error during checkout!",
          isError: true,
        })
      );
      console.error("Error during checkout", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100 relative">
      <h1 className="text-3xl font-bold mb-8 text-primary">Shopping Cart</h1>
      <Button
        auto
        flat
        className="absolute top-5 right-4"
        onClick={() => router.push("/orders")}
      >
        <TbLogs />
        Orders
      </Button>

      {cart.length > 0 ? (
        <div className="space-y-6">
          {cart.map((item) => (
            <Cart
              key={item._id}
              cartItemId={item._id}
              product={{
                ...item.product,
                price: item.price,
                priceAfterDiscount: item.priceAfterDiscount,
                quantity: item.quantity,
                color: item.color,
                size: item.size,
              }}
              handleCartUpdate={handleCartUpdate}
            />
          ))}
          <div className="w-full max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-8">
            <div className="flex gap-2 mb-4">
              <span className="text-xl font-semibold">Products price:</span>
              <span className="text-xl font-semibold">$ {totalCartPrice}</span>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="text-xl font-semibold">
                Total (Tax 6% + Shipping price {shippingCost}):
              </span>
              <span className="text-xl font-semibold text-blue-700">
                $ {totalCartPrice + shippingCost + (totalCartPrice * 6) / 100}
              </span>
            </div>

            {!showShippingForm ? (
              <div className="text-center">
                <Button
                  className="bg-primary text-white px-6 py-2 rounded-lg"
                  onClick={() => setShowShippingForm(true)}
                >
                  Proceed to Checkout
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <Select
                    defaultSelectedKeys={["card"]}
                    disallowEmptySelection={true}
                    label="Payment Method"
                    placeholder="Select a payment method"
                    variant="bordered"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="max-w-xs"
                  >
                    <SelectItem key="card" value="card">
                      Card
                    </SelectItem>
                    {/* <SelectItem key="cash" value="cash">
                          Cash
                        </SelectItem> */}
                  </Select>
                </div>

                <div className="mb-4">
                  <Select
                    defaultSelectedKeys={["Priority"]}
                    disallowEmptySelection={true}
                    label="Shipping Method"
                    placeholder="Select a shipping method"
                    variant="bordered"
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="max-w-xs"
                  >
                    <SelectItem key="Express" value="Express">
                      Express - $30 (same day)
                    </SelectItem>
                    <SelectItem key="Overnight" value="Overnight">
                      Overnight - $15 (second day)
                    </SelectItem>
                    <SelectItem key="Priority" value="Priority">
                      {totalCartPrice > 100
                        ? "Priority (1-3 days) - Free (order >= $100)"
                        : "Priority (1-3 days) - $5 (order < $100)"}
                    </SelectItem>
                  </Select>
                </div>

                <div className="mb-4">
                  <Input
                    name="details"
                    label="Shipping Address Details"
                    value={shippingAddress.details}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    name="phone"
                    label="Phone Number"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    name="city"
                    label="City"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    name="postalCode"
                    label="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Warning message about accurate shipping address */}
                <div className="flex items-center gap-1 text-yellow-600 text-sm mb-2">
                  <FaInfoCircle className="text-base" />
                  Please make sure to enter the shipping address accurately.
                </div>

                <div className="text-center">
                  {orderSuccess && paymentMethod === "cash" && (
                    <p className="text-green-600 mb-4">
                      Order placed successfully. Redirecting to orders page...
                    </p>
                  )}
                  {orderSuccess && paymentMethod === "card" && (
                    <p className="text-green-600 mb-4">
                      Redirecting to checkout page...
                    </p>
                  )}
                  <Button
                    className="bg-primary text-white px-6 py-2 rounded-lg"
                    disabled={checkoutLoading}
                    onClick={handleCheckout}
                  >
                    {checkoutLoading ? (
                      <Spinner color="white" />
                    ) : (
                      "Confirm Order"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-red-500">
          Your cart is empty. Add items to proceed.
        </p>
      )}
    </div>
  );
}
