import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function AlertMessage({ message, isError, onReset }) {
  const [visible, setVisible] = useState(true);
  const time = 2000;
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, time);

    if (onReset) {
      const resetTimer = setTimeout(() => {
        setVisible(true);
        onReset();
      }, time);

      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    } else {
      return () => clearTimeout(timer);
    }
  }, [onReset]);

  if (!visible) return null;

  return (
    <div
      className={`flex justify-start items-center gap-3 fixed top-2 left-1/2 transform -translate-x-1/2 
                            ${
                              isError
                                ? "text-red-700 bg-red-100 border-red-400"
                                : "text-green-700 bg-green-100 border-green-400"
                            } 
                            py-2 px-3 rounded-lg z-50 min-w-[300px] text-center shadow-md`}
    >
      {isError ? (
        <BiError className="text-xl" />
      ) : (
        <IoCheckmarkDoneCircle className="text-xl" />
      )}
      {message}
    </div>
  );
}
