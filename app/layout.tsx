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
  title: "BizCheckr - AI Business Description Validator",
  description: "Validate business descriptions instantly with AI. Check if your business description includes WHAT you do, WHO you serve, and WHERE you operate. Get results in under 1 second with GPT-4o mini.",
  keywords: ["business validation", "AI validator", "business description", "compliance tool", "GPT-4o", "OpenAI", "business checker"],
  authors: [{ name: "BizCheckr" }],
  creator: "BizCheckr",
  publisher: "BizCheckr",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⬛</text></svg>",
  },
  metadataBase: new URL('https://www.bizcheckr.dev'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bizcheckr.dev",
    title: "BizCheckr - AI Business Description Validator",
    description: "Validate business descriptions instantly with AI. Check WHAT, WHO, and WHERE in under 1 second.",
    siteName: "BizCheckr",
    images: [
      {
        url: "https://www.bizcheckr.dev/rich-preview.png",
        width: 1200,
        height: 630,
        alt: "BizCheckr - AI Business Description Validator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizCheckr - AI Business Description Validator",
    description: "Validate business descriptions instantly with AI. Check WHAT, WHO, and WHERE in under 1 second.",
    creator: "@bizcheckr",
    images: ["https://www.bizcheckr.dev/rich-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
