import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "@/context/Web3Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 assets",
  description: "Created by @grossomanache",
};

export interface IDefaultChildren {
  children: ReactNode;
}

export default function RootLayout({ children }: IDefaultChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>
          <main>{children}</main>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
