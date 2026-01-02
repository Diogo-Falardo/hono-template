import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Gym Tracker",
  description: "Diogo Falardo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100 text-neutral-900`}
      >
        {/* Navbar */}
        <header className="border-b bg-white">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Gym Tracker
            </Link>

            <nav className="flex gap-2">
              <Link
                href="/add"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Add
              </Link>
              <Link
                href="/view"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>

        {/* Footer */}
        <footer className="mt-10 border-t bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-neutral-500 text-center">
            Simple Gym Tracker · Built by Diogo Falardo
          </div>
        </footer>
      </body>
    </html>
  );
}
