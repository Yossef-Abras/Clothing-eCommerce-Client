import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { resendVerificationCode, verifyEmail } from "../../public/global/auth";
import { useRouter } from "next/router";
import CodeInput from "../components/CodeInput";

export default function VerifyEmail() {
  const router = useRouter();
  const [message, setMessage] = useState({ error: false, data: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("user"))?.email;
    setUserEmail(email);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage({ error: false, data: "" });

    try {
      const response = await verifyEmail(userEmail, verificationCode);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.emailVerified = true;
        localStorage.setItem("user", JSON.stringify(user));
      }
      setMessage({ error: false, data: response.message });
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } catch (error) {
      setMessage({ error: true, data: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setMessage({ error: false, data: "" });

    try {
      const response = await resendVerificationCode(userEmail);
      setMessage({ error: false, data: response.message });
    } catch (error) {
      setMessage({ error: true, data: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md mx-auto my-20">
        <div className="text-center">
          <h1 className="font-bold text-gray-800 font-sans text-3xl sm:text-4xl mt-8">
            Verify Email
          </h1>
          <p className="text-lg text-gray-600 font-sans mt-4">
            Enter the six-digit code here, please
          </p>
        </div>

        {message.data && (
          <div
            className={`mt-4 text-center font-semibold ${
              message.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.data}
          </div>
        )}

        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <CodeInput onCodeChange={setVerificationCode} />
            <div className="flex flex-col justify-center items-center gap-2">
              {isLoading ? (
                <Spinner className="mt-8" color="primary" />
              ) : (
                <>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-fit mt-8 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-300 sm:mt-6"
                    isDisabled={isLoading}
                  >
                    Submit
                  </Button>

                  <Button
                    onClick={handleResendCode}
                    className="w-fit mt-4 bg-inherit text-primary font-semibold py-3 rounded-lg transition duration-300 hover:text-primary-dark hover:border-2 hover:border-primary"
                    isDisabled={isLoading}
                  >
                    Resend Code
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
