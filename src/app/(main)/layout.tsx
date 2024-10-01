import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo app",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.className}`}>
        <Providers>
          <div className="container-2xl grid grid-rows-auto1fr grid-cols-full min-h-screen">
            <header className="p-2">
              <Header />
            </header>
            <main className="">{children}</main>
            <footer className="bg-red-950 text-center text-white dark:bg-red-400 dark:text-black p-1">
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}