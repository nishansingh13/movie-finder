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
  title: "Where To Watch – Find Streaming Availability Worldwide",
  description: "Want to know where to watch your favorite movie? Our platform helps you find streaming availability in your country and worldwide. Discover which platforms are streaming movies near you and where they are available if not in your region. Search now and never miss out on a great film!",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "google-site-verification": "Jc3O9XhPMKz8PUkRtR5MG7t4Z-H1P82mF4kJq1cUo0E",
    "google-adsense-account": "ca-pub-2845318690222180", // Replace with your full verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2845318690222180"
     crossOrigin="anonymous"></script>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="application-name" content="MovieFinder" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
