import type { Metadata } from "next";
import "./globals.css";
import { AlertDialogProvider } from "@/common/providers/alert-provider";

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
        <div className="w-full max-w-93.75 min-h-screen bg-white text-black shadow-lg overflow-x-hidden">
          <AlertDialogProvider>{children}</AlertDialogProvider>
        </div>
      </body>
    </html>
  );
}
