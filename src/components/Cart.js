import {
  Input,
  Button,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  updateCartItemQuantity,
  deletProductFromCart,
} from "../../public/global/cart";

export default function Cart({ cartItemId, product, handleCartUpdate }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [initialQuantity, setInitialQuantity] = useState(product.quantity);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const price = product.priceAfterDiscount
    ? product.priceAfterDiscount
    : product.price;

  useEffect(() => {
    setIsQuantityChanged(quantity !== initialQuantity);
  }, [quantity, initialQuantity]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const updateQuantity = async () => {
    if (quantity < 1) return;

    setIsUpdating(true);
    try {
      const res = await updateCartItemQuantity(cartItemId, quantity);
      handleCartUpdate(
        res.data.totalPriceAfterDiscount || res.data.totalCartPrice,
        res.data.cartItems
      );
      setInitialQuantity(quantity);
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deletProductFromCart(cartItemId);
      handleCartUpdate(res.data.totalCartPrice, (prevCart) =>
        prevCart.filter((item) => item._id !== cartItemId)
      );
      onClose();
    } catch (error) {
      console.error("Failed to remove product from cart", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-lg mb-6">
      <div className="absolute top-2 right-2">
        <Button
          onClick={onOpen}
          className="bg-transparent text-red-500 hover:text-red-700 min-w-min rounded-full p-0"
          auto
          light
        >
          <MdDelete size={24} />
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-32 max-h-44">
          <Image
            width={3000}
            height={4000}
            src={product.imageCover}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-1 text-lg">Price: ${price}</p>
          <p className="text-gray-700 mb-1 text-lg">
            Total: ${price * quantity}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-700">Color:</span>
            {product.color}
            <span
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: product.color }}
            />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700">Size:</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md">
              {product.size}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={handleDecrease}
          className="bg-primary text-white rounded-full min-w-min w-8 h-8 p-0"
        >
          -
        </Button>
        <Input
          type="text"
          value={quantity}
          readOnly
          className="w-16 text-center"
        />
        <Button
          onClick={handleIncrease}
          className="bg-primary text-white rounded-full min-w-min w-8 h-8 p-0"
        >
          +
        </Button>
        <Button
          onClick={updateQuantity}
          className={`bg-primary text-white rounded-full px-4 ml-auto ${
            !isQuantityChanged || isUpdating
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!isQuantityChanged || isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-primary">
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to remove this item from your cart?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={handleDelete}
                  isDisabled={isDeleting}
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
