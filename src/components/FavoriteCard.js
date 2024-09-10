import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function FavoriteCard({
  id,
  productname,
  price,
  priceAfterDiscount,
  img,
  handleRemove,
}) {
  const router = useRouter();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await handleRemove();
    setIsDeleting(false);
    onClose();
  };

  const handleAddToCart = () => {
    router.push("/products/" + id);
  };

  return (
    <div className="min-w-60 w-60 m-2 rounded-lg shadow-lg border-1 border-orange-400 bg-white overflow-hidden block mx-auto">
      <div className="flex justify-center min-h-[328px] relative">
        <Image
          width={4000}
          height={3000}
          src={img}
          alt={productname}
          className={`w-fit rounded-none max-h-[328px] relative z-10 ${imageLoaded ? "" : "hidden"
            }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <hr />
      <div className="w-60 flex justify-between px-2 pb-4 rounded-lg">
        <div className="w-52 flex flex-col mx-auto">
          <p className="py-1 text-lg font-bold">{productname}</p>
          <div className=" flex gap-3 justify-between">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-inherit border-1 text-orange-400 hover:text-black border-orange-400 rounded-md hover:bg-orange-300 px-4 py-2 "
            >
              Add to Cart {priceAfterDiscount ? (<div className="flex items-center gap-1">
                <p className="text-sm text-gray-600 line-through">{price}$</p>
                <p className="text-lg text-red-600 font-bold">{priceAfterDiscount}$</p>
              </div>)

                : (<b className="text-black">{price}$</b>)}
            </Button>
            <Button
              className="text-lg border-1 border-red-500 bg-inherit text-red-500 px-2 py-2 rounded min-w-10 hover:bg-red-300"
              onClick={onOpen}
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </div>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row text-orange-300 gap-3">
                <p>Confirm Deletion</p>
              </ModalHeader>

              <ModalBody>
                <p>
                  Are you sure you want to remove this item from your favorites?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Removing..." : "Remove"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
