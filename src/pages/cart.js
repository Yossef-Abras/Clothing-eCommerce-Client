import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { deletProductFromCart, getCart } from "../../public/global/cart";
export default function CartSellers() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  // const totalPrice = cart.reduce(
  //   (acc, cart) => acc + cart.price * cart.quantity,0);

  useEffect(() => {
    setLoading(true);
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCart(cart);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (_id) => {
    try {
      await deletProductFromCart(_id);
      setFavorites(cart.filter((product) => product._id !== _id));
    } catch (error) {
      console.error("Failed to remove product from cart", error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-[400px] text-orange-500 flex justify-center items-center">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <div className=" w-full min-h-screen p-5 ">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div>
          <div className="flex flex-col items-center justify-center">
            {products.map((product) => (
              <Cart
                key={product.id}
                product={product}
                handleRemove={() => handleRemove(product._id)}
              />
            ))}
          </div>
          <div className="w-full mt-6 flex flex-col">
            <div className="flex justify-between mx-10 border-2 border-orange-300 rounded-sm p-3">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">{totalPrice}$</span>
            </div>
            <div className="mt-4 self-center">
              <button className="bg-orange-400 text-white font-bold py-2 px-4 rounded">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      )}
    </div>
  );
}
