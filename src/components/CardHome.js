import { Button, Image } from "@nextui-org/react";
import { FaRegImage } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder, MdOutlineEmojiPeople } from "react-icons/md";
export default function CardHome({ prodectname, price, img, isFavorite }) {
  return (
    <div className="min-w-60 m-2 rounded-lg shadow-lg border-1 border-orange-400 bg-white">
      <div className="flex justify-center min-h-64 relative">
        <div className=" flex-col absolute inset-0 flex items-center justify-center">
          <FaRegImage name="woman" size={100} className="text-gray-300" />
          Loading image
        </div>
        <Image
          width={4000}
          height={3000}
          src={img}
          alt={prodectname}
          className="w-fit relative z-10"
        />
      </div>
      <hr />
      <div className="flex justify-between px-2 pb-4 rounded-lg">
        <div className="flex flex-col">
          <p className="text-lg font-bold">{prodectname}</p>
          <p>{price}</p>
        </div>
        <Button
          className="bg-inherit text-lg min-w-0 w-8 p-0"
          style={{ cursor: "pointer" }}
        >
          {isFavorite ? (
            <MdFavorite style={{ color: "red" }} />
          ) : (
            <MdFavoriteBorder />
          )}
        </Button>
      </div>
    </div>
  );
}
// const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
// useEffect(() => {
//     setIsFilled(isFavorite(productId));
// }, [isFavorite, productId]);

// const handleIconClick = () => {
//     if (isFilled) {
//         removeFromFavorites(productId);
//     } else {
//         addToFavorites({ productId, prodectname, price, img });
//     }
//     setIsFilled(!isFilled);
// };
