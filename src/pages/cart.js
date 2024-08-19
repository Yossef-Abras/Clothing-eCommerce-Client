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
    <div className=" w-full min-h-screen p-5 ">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {products.length > 0 ? (
        <div>
          <div className="flex flex-col items-center justify-center">
            {products.map((product) => (
              <Cart key={product.id} product={product} />
            ))}
          </div>
          <div className="w-full mt-6 flex flex-col">
            <div className='flex justify-between mx-10 border-2 border-orange-300 rounded-sm p-3'>
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
