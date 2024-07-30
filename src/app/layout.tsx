import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import ActiveStatus from "@/components/active-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChitChat",
  description: "Realtime chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <ActiveStatus />
        <Toaster />
      </body>
    </html>
  );
}
