import { Button, Image } from "@nextui-org/react";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/router";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../public/global/wishlist";

export default function ProductCard({
  id,
  prodectname,
  price,
  priceAfterDiscount,
  img,
  onAddToWishlist,
  onDeleteFromWishlist,
  isFav,
}) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingDeleting, setIsAddingDeleting] = useState(false);

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    setIsAddingDeleting(true);
    try {
      if (isFav) {
        await deleteFromWishlist(id);
        onDeleteFromWishlist(id);
        localStorage.setItem(
          "alertMessage",
          JSON.stringify({ message: "Removed from wishlist!", isError: false })
        );
      } else {
        await addToWishlist(id);
        onAddToWishlist(id);
        localStorage.setItem(
          "alertMessage",
          JSON.stringify({ message: "Added to wishlist!", isError: false })
        );
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      localStorage.setItem(
        "alertMessage",
        JSON.stringify({
          message: error.message || "Unknown error!!",
          isError: true,
        })
      );
    } finally {
      setIsAddingDeleting(false);
    }
  };

  return (
    <div
      onClick={() => router.push("/products/" + id)}
      className="relative w-full max-w-xs p-4 m-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 cursor-pointer mx-auto"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg flex justify-center items-center">
        <Image
          width={3000}
          height={4000}
          src={img}
          alt={prodectname}
          className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-bold text-gray-800">{prodectname}</p>
          {priceAfterDiscount ? (
            <div className="flex justify-items-center gap-1">
              <p className="my-auto text-sm text-gray-500 line-through">
                {price}$
              </p>
              <p className="text-lg text-red-600 font-bold">
                {priceAfterDiscount}$
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">{price}$</p>
          )}
        </div>
        <Button
          onClick={handleAddToWishlist}
          disabled={isAddingDeleting}
          className="bg-transparent hover:bg-transparent p-0 m-0 min-w-0"
          aria-label="Add to wishlist"
        >
          {isFav ? (
            <MdFavorite className="text-red-500" size={24} />
          ) : (
            <MdFavoriteBorder className="text-gray-500" size={24} />
          )}
        </Button>
      </div>
    </div>
  );
}
