import Cart from "../components/Cart";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import {
  deletProductFromCart,
  getCart,
  updateCartItemQuantity,
} from "../../public/global/cart";

export default function CartSellers() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCart(cart.data.cartItems);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleCartUpdate = (updatedCart) => {
    setCart(updatedCart);
  };

  const handleRemove = async (_id) => {
    try {
      await deletProductFromCart(_id);
      setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Failed to remove product from cart", error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    try {
      await updateCartItemQuantity(cartItemId, newQuantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-400">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-orange-400">Shopping Cart</h1>

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
              <span className="text-xl font-semibold">
                $
                {cart.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                )}
              </span>
            </div>
            <div className="text-center">
              <Button className="bg-orange-400 text-white px-6 py-2 rounded-lg">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">Your cart is empty.</p>
      )}
    </div>
  );
}
