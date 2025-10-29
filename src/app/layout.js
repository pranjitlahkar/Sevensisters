import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AgeGateGate from "@/components/AgeGateGate";

import Footer from '@/components/Footer'
import Navbar from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: {
    default: "Seven Sisters Trade and Distilleries Pvt Ltd", // Title for the homepage
    template: "%s | Seven Sisters Trade and Distilleries Pvt Ltd", // Title for other pages (e.g., "About | Seven Sisters Trade and Distilleries Pvt Ltd")
  },
  description: "This is the official website of Seven Sisters Trade and Distilleries Pvt Ltd, a renowned name in the beverage industry.This site provides information about our products, mission, vision, and company history. The best distillery in Northeast India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Navbar />
        <AgeGateGate />
        {children}
        <Footer />
      </body>
    </html>
  );
}
