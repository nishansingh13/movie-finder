import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Find movies streaming",
  description: "Find out where is your favourite movies streaming which country and which platform",
  other: {
    "google-site-verification": "Jc3O9XhPMKz8PUkRtR5MG7t4Z-H1P82mF4kJq1cUo0E", // Replace with your full verification code
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
          <main className="">{children}</main>
      
      </body>
    </html>
  );
}

