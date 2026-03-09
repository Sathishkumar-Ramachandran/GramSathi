import type { Metadata } from "next";
import { Inter, Noto_Sans, Noto_Sans_Devanagari, Noto_Sans_Tamil, Noto_Sans_Telugu, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });
const notoHi = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-noto-hi", weight: ["400", "700"] });
const notoTa = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-noto-ta", weight: ["400", "700"] });
const notoTe = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-noto-te", weight: ["400", "700"] });
const notoBn = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-noto-bn", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "GramSathi",
  description: "AI super-app for rural India",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${inter.variable} ${notoHi.variable} ${notoTa.variable} ${notoTe.variable} ${notoBn.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
