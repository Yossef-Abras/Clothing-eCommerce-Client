"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/router";

export default function Providers({ childern }) {
  const router = useRouter();

  return <NextUIProvider navigate={router.push}>{childern}</NextUIProvider>;
}
