import { useEffect, useState } from "react";
import { Button, Spinner, Input, Select, SelectItem } from "@nextui-org/react";
import { getCart } from "../../public/global/cart";
import {
  createCheckoutSession,
  createCashOrder,
} from "../../public/global/order";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { TbLogs } from "react-icons/tb";

export default function CartSellers() {
  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
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
        setTotalCartPrice(cart.data.totalCartPrice);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleCartUpdate = (totalCartPrice, updatedCart) => {
    setCart(updatedCart);
    setTotalCartPrice(totalCartPrice);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      if (paymentMethod === "cash") {
        // Handle cash order creation
        const cashOrderResponse = await createCashOrder(
          cartId,
          shippingAddress
        );
        if (cashOrderResponse.status === "success") {
          setOrderSuccess(true);
          router.push("/orders");
        }
      } else {
        // Handle card payment
        const sessionResponse = await createCheckoutSession(
          cartId,
          shippingAddress
        );
        if (sessionResponse.status === "success") {
          window.location.href = sessionResponse.url; // Redirect to Stripe Checkout
        } else {
          console.error("Failed to create checkout session");
        }
      }
    } catch (error) {
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
      <div className="min-h-screen flex items-center justify-center text-orange-400">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100 relative">
      <h1 className="text-3xl font-bold mb-8 text-orange-400">Shopping Cart</h1>
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
                quantity: item.quantity,
                color: item.color,
                size: item.size,
              }}
              handleCartUpdate={handleCartUpdate}
            />
          ))}
          <div className="w-full max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-8">
            <div className="flex justify-between mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-xl font-semibold">$ {totalCartPrice}</span>
            </div>
            {!showShippingForm ? (
              <div className="text-center">
                <Button
                  className="bg-orange-400 text-white px-6 py-2 rounded-lg"
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
                    // selectedKeys={[paymentMethod]}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="max-w-xs"
                  >
                    <SelectItem key="cash" value="cash">
                      Cash
                    </SelectItem>
                    <SelectItem key="card" value="card">
                      Card
                    </SelectItem>
                  </Select>
                </div>
                <div className="mb-4">
                  <Input
                    name="details"
                    label="Shipping Details"
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
                <div className="text-center">
                  {orderSuccess && (
                    <p className="text-green-600 mb-4">
                      Redirecting to payment...
                    </p>
                  )}
                  <Button
                    className="bg-orange-400 text-white px-6 py-2 rounded-lg"
                    onClick={handleCheckout}
                    isDisabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">Your cart is empty.</p>
      )}
    </div>
  );
}
