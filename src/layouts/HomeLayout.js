import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { isLogin } from "../../public/global/auth";
import { useRouter } from "next/router";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { sign } from "../store/userSlice";


export default function HomeLayout({ children, className }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const userPages = ["/cart", "/favorite"];

  useEffect(() => {
    const isLogged = async () => {
      try {
        setPageLoading(true);
        const result = await isLogin();
        dispatch(sign(result))
        console.log(result)
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
    if (!pageLoading && userPages.includes(router.pathname) && !isLoggedIn)
      router.replace("/");
    setShowVerificationMessage(
      !JSON.parse(localStorage.getItem("user"))?.emailVerified && isLoggedIn
    );
  }, [router, isLoggedIn, pageLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      const alertData = JSON.parse(localStorage.getItem("alertMessage"));
      if (alertData) {
        setAlertMessage(alertData.message);
        setIsError(alertData.isError);
        localStorage.removeItem("alertMessage");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (pageLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Spinner color="primary" />
      </div>
    );

  if (userPages.includes(router.pathname) && !isLoggedIn) return <></>;

  return (
    <div className={className}>
      <MyNavbar />

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          isError={isError}
          onReset={() => setAlertMessage(null)}
        />
      )}

      {/* Add padding-top to prevent content from being hidden by the fixed Navbar */}
      <main style={{ paddingTop: "64px" }}>
        {showVerificationMessage &&
          !router.pathname.endsWith("/verify-email") && (
            <div
              style={{ marginBottom: "15px", marginTop: "15px" }}
              className="mx-auto w-fit bg-primary/20 text-primary p-2 px-3 rounded-lg shadow-md flex gap-2 justify-between items-center"
            >
              <span>You should verify your email</span>
              <Button
                className="bg-primary text-white font-bold px-4 rounded-md min-h-8 h-8"
                onClick={() => {
                  router.push("/verify-email");
                }}
              >
                verify now!
              </Button>
            </div>
          )}
        {children}
      </main>

      <Footer />
    </div>
  );
}
