import { useEffect, useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { deleteFromWishlist, getWishlist } from "../../public/global/wishlist";
import { Spinner } from "@nextui-org/react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchWishlist = async () => {
      try {
        const wishlist = await getWishlist();
        setFavorites(wishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (_id) => {
    try {
      await deleteFromWishlist(_id);
      setFavorites(favorites.filter((product) => product._id !== _id));
    } catch (error) {
      console.error("Failed to remove product from wishlist", error);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <FavoriteCard
              key={product._id}
              id={product._id}
              productname={product.title}
              price={product.price}
              img={product.imageCover}
              handleRemove={() => handleRemove(product._id)}
            />
          ))
        ) : (
          <p className="text-gray-600">Your favorites list is empty.</p>
        )}
      </div>
    </div>
  );
}
