"use client";

import { NextUIProvider } from "@nextui-org/system";

export default function Providers({ childern }) {
    return (
        <NextUIProvider>
            {childern}
        </NextUIProvider>
    );
}