import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { login, signup } from "../../global/auth";
import Message from "./Message";
import { useDispatch } from "react-redux";
import { sign } from "../store/userSlice";
export default function Login() {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [Formislogin, setFormisLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [message, setMessage] = useState({ data: '', isError: Boolean });
  const dispatch = useDispatch();
  const resetMessage = () => {
    setMessage({ data: '', isError: Boolean });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      if (Formislogin) {
        setLoading(true);
        const response = await login(
          formData.email,
          formData.password);
        if (!response.error) {
          localStorage.setItem('token', response.data.token);
          setMessage({ data: 'Login successful', isError: true });
          dispatch(sign(response.data.token));
          onClose();
        } else {
          setMessage({ data: response.msg, isError: false })
        }
        setLoading(false);
      } else {
        setLoading(true);
        const response = await signup(
          formData.name,
          formData.email,
          formData.password,
          formData.passwordConfirm);
        if (!response.error) {
          localStorage.setItem('token', response.data.token);
          setMessage({ data: 'signup successful', isError: true });
          dispatch(sign(response.data.user));
          onClose();
        } else {
          setMessage({ data: response.msg, isError: false })
        }
        setLoading(false);
      }
    } catch (message) {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        className="min-w-fit flex rounded-full bg-orange-200 justify-center items-center  md:text-lg text-black"
      >
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
                <p>{Formislogin ? "Login" : "Signup"}</p>
              </ModalHeader>

              {Formislogin ? (
                <ModalBody>
                  <Input
                    autoFocus
                    label="Email"
                    placeholder="example@email.com"
                    name="email"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                </ModalBody>
              ) : (
                <ModalBody>
                  <Input
                    autoFocus
                    label="Full Name"
                    placeholder="John Mark"
                    name="name"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                  <Input
                    autoFocus
                    type="email"
                    label="Email"
                    placeholder="example@email.com"
                    name="email"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    name="passwordConfirm"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                </ModalBody>
              )}
              <div className="flex py-2 px-1 justify-center">
                <Link
                  className="hover:text-orange-300"
                  href=""
                  onClick={() => setFormisLogin(!Formislogin)}
                >
                  {Formislogin ? "You Dont Have account" : "You have already account?"}
                </Link>
              </div>
              <div className="flex py-2 px-1 justify-center bg-white">
                <Message message={message.data} isError={message.isError} onReset={resetMessage} ></Message>
              </div>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-orange-300" onClick={onSubmit}
                  isDisabled={
                    Formislogin ? !(formData.email &&
                      formData.password) :
                      !(formData.name &&
                        formData.email &&
                        formData.password &&
                        formData.passwordConfirm && formData.password === formData.passwordConfirm)

                  }>
                  {Formislogin ? loading ? "login.." : "login" : loading ? "Signing.." : "Sign up"}

                </Button>
              </ModalFooter>
            </>

          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
