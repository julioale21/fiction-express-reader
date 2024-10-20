import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Providers } from "@/config/providers/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fiction Express Reader",
  description: "A reading app for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ height: "100%", margin: 0, padding: 0, width: "100vw" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ height: "100%", margin: 0, padding: 0 }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
