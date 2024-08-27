import { Button, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Loading } from "@nextui-org/react";
import { useState } from "react";
import { FaRegImage } from "react-icons/fa";

export default function FavoriteCard({ productname, price, img, handleRemove }) {
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await handleRemove();
        setIsDeleting(false);
        onClose();
    };

    return (
        <div className="min-w-60 w-60 m-2 rounded-lg shadow-lg border-1 border-orange-400 bg-white overflow-hidden block mx-auto">
            <div className="flex justify-center min-h-64 relative">
                {!imageLoaded && (
                    <div className="flex-col absolute inset-0 flex items-center justify-center bg-white">
                        <FaRegImage size={100} className="text-gray-300" />
                        Loading image
                    </div>
                )}
                <Image
                    width={4000}
                    height={3000}
                    src={img}
                    alt={productname}
                    className={`w-fit relative z-10 ${imageLoaded ? "" : "hidden"}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <hr />
            <div className="flex justify-between px-2 pb-4 rounded-lg">
                <div className="flex flex-col">
                    <p className="text-lg font-bold">{productname}</p>
                    <p>{price}</p>
                    <div className="mt-2 mx-2 flex gap-5 justify-between">
                        <Button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={onOpen}
                        >
                            Remove
                        </Button>
                        <Button
                            className="bg-inherit border-1 border-orange-400 rounded-md hover:bg-orange-300 px-4 py-2 "
                        >
                            Add to Cart
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
                                <p>Are you sure you want to remove this item from your favorites?</p>
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
