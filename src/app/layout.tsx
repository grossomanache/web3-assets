import { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 assets",
  description: "Created by @grossomanache",
};

export interface IDefaultChildren {
  children: ReactNode;
}

export default function RootLayout({ children }: IDefaultChildren) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal initialState={initialState}>
          <main>{children}</main>
        </Web3Modal>
      </body>
    </html>
  );
}
