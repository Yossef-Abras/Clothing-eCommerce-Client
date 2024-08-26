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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login, signup } from "../../global/auth";
import Message from "./Message";
import { useDispatch } from "react-redux";
import { sign } from "../store/userSlice";

export default function Login({ onSuccess }) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [Formislogin, setFormisLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [message, setMessage] = useState({ data: "", isError: Boolean });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const resetMessage = () => {
    setMessage({ data: "", isError: Boolean });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async () => {
    try {
      if (Formislogin) {
        setLoading(true);
        const response = await login(formData.email, formData.password);
        if (!response.error) {
          setMessage({ data: "Login successful", isError: true });
          onClose();
          onSuccess();
        } else {
          setMessage({ data: response.msg, isError: false });
        }
        setLoading(false);
      } else {
        setLoading(true);
        const response = await signup(
          formData.name,
          formData.email,
          formData.password,
          formData.passwordConfirm
        );
        if (!response.error) {
          setMessage({ data: "signup successful", isError: true });
          onClose();
          onSuccess();
        } else {
          setMessage({ data: response.msg, isError: false });
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
        onClick={onOpen}
        className="min-w-fit flex rounded-full bg-orange-200 justify-center items-center  md:text-lg text-black"
      >
        <BsPerson />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row text-orange-300 gap-3">
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
                  <div className="relative">
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleInputChange}
                      variant="bordered"
                    />
                    <span
                      className="absolute right-3 top-6 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="flex justify-end py-2">
                    <Link
                      href="/forget-password"
                      className="text-orange-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
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
                    type="email"
                    label="Email"
                    placeholder="example@email.com"
                    name="email"
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                  <div className="relative">
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleInputChange}
                      variant="bordered"
                    />
                    <span
                      className="absolute right-3 top-6 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      type={showPassword ? "text" : "password"}
                      name="passwordConfirm"
                      onChange={handleInputChange}
                      variant="bordered"
                    />
                    <span
                      className="absolute right-3 top-6 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </ModalBody>
              )}

              <div className="flex py-2 px-1 justify-center">
                <Link
                  className="hover:text-orange-300"
                  href=""
                  onClick={() => setFormisLogin(!Formislogin)}
                >
                  {Formislogin
                    ? "You Dont Have account"
                    : "You have already account?"}
                </Link>
              </div>
              <div className="flex py-2 px-1 justify-center bg-white">
                <Message
                  message={message.data}
                  isError={message.isError}
                  onReset={resetMessage}
                ></Message>
              </div>
              <ModalFooter>
                <Button variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-orange-300"
                  onClick={onSubmit}
                  isDisabled={
                    Formislogin
                      ? !(formData.email && formData.password)
                      : !(
                          formData.name &&
                          formData.email &&
                          formData.password &&
                          formData.passwordConfirm &&
                          formData.password === formData.passwordConfirm
                        )
                  }
                >
                  {Formislogin
                    ? loading
                      ? "login.."
                      : "login"
                    : loading
                    ? "Signing.."
                    : "Sign up"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
