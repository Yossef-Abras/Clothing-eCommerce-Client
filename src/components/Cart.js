import { Button, Image, Input, Select } from '@nextui-org/react';
import { useState } from 'react';

export default function Cart({ product }) {
    const [quantity, setQuantity] = useState(product.quantity);
    const price = product.price;

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="w-auto rounded overflow-hidden shadow-lg p-2 bg-white mb-4 border-2 border-orange-400">
            <div className='flex justify-center w-full items-center gap-14'>
                <Image
                    className="w-3/4 max-h-40 h-40 self-center"
                    src={product.img}
                    alt={product.name}
                />
                <div className="w-1/2 flex flex-col flex-nowrap">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">Price: {price} $</p>
                    <p className="text-gray-700 text-base">Total: {price * quantity} $</p>
                </div>
            </div>
            <div className="px-6 py-4 flex items-center gap-2">
                <span className="mr-2">Quantity:</span>
                <Button
                    onClick={handleDecrease}
                    className="bg-inherit font-bold rounded-full border-2 border-orange-400 w-fit"
                >
                    -
                </Button>
                <Input
                    autoFocus
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-full text-center"
                />
                <Button
                    onClick={handleIncrease}
                    className="bg-inherit font-bold rounded-full border-2 border-orange-400 w-fit"
                >
                    +
                </Button>
            </div>
            <div className="px-6 py-4">
                <label className="block text-md font-bold mb-2">
                    Choose Color:
                </label>
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                    <option>Black</option>
                    <option>Gray</option>
                    <option>Dark Blue</option>
                </select>
            </div>
            <div className="px-6 py-4">
                <label className="block text-md font-bold mb-2">
                    Choose Size:
                </label>
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                </select>
            </div>
            <div className='flex justify-end'>
                <Button className='bg-red-400 text-white' >remove</Button>
            </div>

        </div>
    );
}
