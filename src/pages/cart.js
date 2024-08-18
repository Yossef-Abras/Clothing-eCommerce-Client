import Cart from '../components/Cart';
import { useState } from 'react';
export default function CartSellers() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Stylish Short', price: 165, img: "/img/girl.png", quantity: 1 },
    { id: 2, name: 'Stylish Short', price: 165, img: "/img/girl.png", quantity: 2 },
    { id: 3, name: 'Stylish Short', price: 165, img: "/img/girl.png", quantity: 2 },
  ]);
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-5 ">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className=''></div>
      {products.length > 0 ? (
        <>
          {products.map((product) =>
            <Cart key={product.id} product={product} />
          )}

          <div className="mt-6">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold">{totalPrice} SAR</span>
          </div>

          <div className="mt-4">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      )}
    </div>
  );
}
