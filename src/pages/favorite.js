
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
    },]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Favorites</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.length > 0 ? (
                    favorites.map(product => (
                        <div key={product.productId} className="border p-4 rounded-lg shadow-md">
                            <img src={product.img} alt={product.prodectname} className="h-40 w-full object-cover mb-4" />
                            <h2 className="text-lg font-semibold">{product.prodectname}</h2>
                            <p className="text-gray-600">${product.price}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                // onClick={() => removeFromFavorites(product.productId)}
                                >
                                    Remove
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                // onClick={() => addToCart(product.productId)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Your favorites list is empty.</p>
                )}
            </div>
        </div>
    );
}
