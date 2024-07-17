import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";

export default function Login() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [Formislogin, setFormisLogin] = useState(true)
    if (Formislogin) {
        return (
            <div>
                <Button onPress={onOpen} className="min-w-fit flex rounded-full bg-orange-200 justify-center items-center  md:text-lg text-black">
                    <BsPerson />
                </Button>
                <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-row text-orange-300  gap-3">
                                    <p>Login</p>
                                </ModalHeader>

                                <ModalBody>
                                    <Input
                                        autoFocus
                                        label="Email"
                                        placeholder="Enter your email"
                                        variant="bordered"
                                    />

                                    <div className="flex py-2 px-1 justify-center">
                                        <Link href="" onClick={() => setFormisLogin(!Formislogin)}>
                                            you don't have account?
                                        </Link>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button className="bg-orange-300" onPress={onClose}>
                                        login
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

        )


    } else {
        return (
            <div>
                <Button onPress={onOpen} className="min-w-fit flex rounded-full bg-orange-200 justify-center items-center  md:text-lg text-black">
                    <BsPerson />
                </Button>
                <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-row text-orange-300 gap-3">
                                    <Link href="#">sign up</Link>
                                </ModalHeader>

                                <ModalBody>
                                    <Input
                                        autoFocus
                                        label="Email"
                                        placeholder="Enter your email"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        variant="bordered"
                                    />
                                    <div className="flex py-2 px-1 justify-center">
                                        <Link className="hover:text-orange-300" href='' onClick={() => setFormisLogin(!Formislogin)}>
                                            You have alredy account?
                                        </Link>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button className="bg-orange-300" onPress={onClose}>
                                        Sign up
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

        )

    }



}
