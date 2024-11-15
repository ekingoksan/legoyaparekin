import {Inter} from "next/font/google";
import { ToasterProvider } from "@/providers/toast-provider";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "@/components/ui/toaster"


import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lego Yapar",
  description: "Lego Yapar",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="tr">
      <body className={inter.className}>
        <ToasterProvider />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
