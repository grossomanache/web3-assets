import { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { Karla } from "next/font/google";
import "./globals.css";
import { Web3Modal } from "@/context";
import { OrFooter } from "@/components/organisms/or-footer";

const karla = Karla({ subsets: ["latin"], weight: ["400"] });

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
      <body className={karla.className}>
        <Web3Modal initialState={initialState}>
          <main>{children}</main>
          <OrFooter className="p-10 text-center" />
        </Web3Modal>
      </body>
    </html>
  );
}
