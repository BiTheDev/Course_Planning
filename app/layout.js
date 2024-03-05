import { Inter } from "next/font/google";
import "./globals.css";
import { MajorProvider } from "@/components/General/MajorProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Northeastern University Seattle Course Planning System",
  description: "Northeastern University Seattle Course Planning System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MajorProvider>
        <body className={inter.className}>
          {children}</body>
      </MajorProvider>
    </html>
  );
}
