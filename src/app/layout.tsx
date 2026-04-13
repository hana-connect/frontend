import type { Metadata } from "next";
import "./globals.css";
import { AlertDialogProvider } from "@/common/providers/alertProvider";

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
      <body className="min-h-full flex flex-col">
        <AlertDialogProvider>{children}</AlertDialogProvider>
      </body>
    </html>
  );
}
