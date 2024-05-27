import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navigation from "@/src/components/Navigation";
import "./globals.css";
import { cn } from "@/lib/utils";
import MobileNav from "@/src/components/MobileNav";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-slate-950 mb-[58px]",
          outfit.variable
        )}
      >
        <Navigation />
        {children}
        <div className="bg-slate-950 border-t border-white/10 fixed bottom-0 z-50 left-0 right-0">
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
