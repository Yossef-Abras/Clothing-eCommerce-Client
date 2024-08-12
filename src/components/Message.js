import React, { useState, useEffect } from 'react';


export default function Message({ message, isError, onReset }) {
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


    const messageStyle = {
        color: isError ? 'green' : 'red',
        padding: '7px',
    };

    return <div style={messageStyle}>{message}</div>;
};


