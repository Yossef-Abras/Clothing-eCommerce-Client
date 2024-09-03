import { useEffect, useState } from "react";

export default function AlertMessage({ message, isError, onReset }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        if (onReset) {
            const resetTimer = setTimeout(() => {
                setVisible(true);
                onReset();
            }, 5000);

            return () => {
                clearTimeout(timer);
                clearTimeout(resetTimer);
            };
        } else {
            return () => clearTimeout(timer);
        }
    }, [onReset]);

    if (!visible) return null;

    const messageClasses = `fixed top-2 left-1/2 transform -translate-x-1/2 
                            ${isError ? 'text-red-700 bg-red-100 border-red-400' : 'text-green-700 bg-green-100 border-green-400'} 
                            p-2 rounded-lg z-50 min-w-[300px] text-center shadow-md`;

    return <div style={messageClasses}>{message}</div>;
}
