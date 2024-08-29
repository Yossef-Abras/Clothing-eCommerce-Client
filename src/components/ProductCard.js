import { Button, Image } from "@nextui-org/react";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
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
  img,
  onAddToWishlist,
  onDeleteFromWishlist,
  isFav,
}) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingDeleting, setIsAddingDeleting] = useState(false);

  const handleAddToWishlist = async () => {
    if (isFav) {
      setIsAddingDeleting(true);
      try {
        await deleteFromWishlist(id);
        onDeleteFromWishlist(id);
      } catch (error) {
      } finally {
        setIsAddingDeleting(false);
      }
    } else {
      setIsAddingDeleting(true);
      try {
        await addToWishlist(id);
        onAddToWishlist(id);
      } catch (error) {
      } finally {
        setIsAddingDeleting(false);
      }
    }
  };

  return (
    <div
      onClick={() => router.push("/products/" + id)}
      className="min-w-60 w-60 m-2 rounded-lg shadow-lg border-1 border-orange-400 bg-white overflow-hidden block mx-auto cursor-pointer"
    >
      <div className="flex justify-center min-h-[328px] relative">
        {!imageLoaded && (
          <div className="flex-col absolute inset-0 flex items-center justify-center bg-white">
            <FaRegImage name="woman" size={100} className="text-gray-300" />
            Loading image
          </div>
        )}
        <Image
          width={4000}
          height={3000}
          src={img}
          alt={prodectname}
          className={`w-60 relative rounded-none max-h-[328px] z-10 ${
            imageLoaded ? "" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <hr />
      <div className="flex justify-between px-2 pb-4 rounded-lg">
        <div className="flex flex-col">
          <p className="text-lg font-bold">{prodectname}</p>
          <p>{price}$</p>
        </div>
        <Button
          className="bg-inherit text-lg min-w-0 w-8 p-0"
          style={{ cursor: "pointer" }}
          onClick={handleAddToWishlist}
          disabled={isAddingDeleting}
        >
          {isFav ? (
            <MdFavorite style={{ color: "red" }} />
          ) : (
            <MdFavoriteBorder />
          )}
        </Button>
      </div>
    </div>
  );
}
