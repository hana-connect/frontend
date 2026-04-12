import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HANA CONNECT",
  description: "HANA CONNECT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col items-center">
        <div className="w-full max-w-[375px] min-h-screen bg-white shadow-lg overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
