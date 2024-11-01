import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { AppbarClient } from "../AppbarClient";

export const metadata: Metadata = {
  title: "Paikamu",
  description: "developed by sai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={"bg-orange-100"}>
          <AppbarClient />
          {children}
        </body>
      </Providers>

    </html>
  );
}
