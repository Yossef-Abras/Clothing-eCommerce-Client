import { Button, Image } from "@nextui-org/react";
import FavoriteCard from "../components/FavoriteCard";

export default function Favorites() {
    const favorites = [{
        productId: 1,
        name: 'Product 1',
        price: '$10.00',
        img: "/img/ss.jpg"
    },
    {
        productId: 2,
        name: 'Product 2',
        price: '$20.00',
        img: "/img/ss.jpg"
    },
    {
        productId: 2,
        name: 'Product 2',
        price: '$20.00',
        img: "/img/ss.jpg"
    },
    {
        productId: 2,
        name: 'Product 2',
        price: '$20.00',
        img: "/img/ss.jpg"
    },
    {
        productId: 2,
        name: 'Product 2',
        price: '$20.00',
        img: "/img/ss.jpg"
    },
    {
        productId: 2,
        name: 'Product 2',
        price: '$20.00',
        img: "/img/ss.jpg"
    },
    ]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Favorites</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.length > 0 ? (
                    favorites.map(product => (
                        <FavoriteCard
                            key={product._id}
                            prodectname={product.name}
                            price={product.price}
                            img={product.imageCover}
                        />))
                ) : (
                    <p className="text-gray-600">Your favorites list is empty.</p>
                )}
            </div>
        </div>
    );
}
