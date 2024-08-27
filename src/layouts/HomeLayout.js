import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { isLogin } from "../../public/global/auth";
import { useRouter } from "next/router";
export default function HomeLayout({ children }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [loginUserState, setLoginUserState] = useState(false);
  const userPages = ["/cart", "/favorite"];

  useEffect(() => {
    const isLogged = async () => {
      try {
        setPageLoading(true);
        const result = await isLogin();
        setLoginUserState(result);
        setShowVerificationMessage(
          !JSON.parse(localStorage.getItem("user")).emailVerified && result
        );
      } catch (err) {
      } finally {
        setPageLoading(false);
      }
    };
    isLogged();
  }, []);

  useEffect(() => {
    if (userPages.includes(router.pathname) && !loginUserState)
      router.replace("/");
    setShowVerificationMessage(
      !JSON.parse(localStorage.getItem("user"))?.emailVerified && loginUserState
    );
  }, [router, loginUserState]);

  if (pageLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Spinner color="primary" />
      </div>
    );
  if (userPages.includes(router.pathname) && !loginUserState) return <></>;
  return (
    <div>
      <MyNavbar
        loginUserState={loginUserState}
        onLogin={() => {
          setLoginUserState(true);
          setShowVerificationMessage(
            !JSON.parse(localStorage.getItem("user"))?.emailVerified
          );
        }}
        onLogout={() => {
          setLoginUserState(false);
          setShowVerificationMessage(false);
        }}
      />
      {showVerificationMessage &&
        !router.pathname.endsWith("/verify-email") && (
          <div
            style={{ marginBottom: "15px", marginTop: "15px" }}
            className="mx-auto w-fit bg-orange-200 text-orange-800 p-2 px-3 rounded-lg shadow-md flex justify-between items-center"
          >
            <span>You should verify your email</span>
            <Button
              className="bg-orange-400 text-white font-bold px-4 mx-2 rounded-md min-h-8 h-8"
              onClick={() => {
                router.push("/verify-email");
              }}
            >
              verify now!
            </Button>
          </div>
        )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
