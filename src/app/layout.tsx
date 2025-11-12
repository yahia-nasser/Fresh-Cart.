import type { Metadata } from "next";
import "./globals.css";
import { Encode_Sans_Expanded } from "next/font/google";
import "./../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./_components/Navbar/Navbar";
import { Toaster } from "sonner";
import Providers from "./../Providers";
import Footer from "./_components/Footer/Footer";

const encodeSans = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${encodeSans.className} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
