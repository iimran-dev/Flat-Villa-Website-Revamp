import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flat&Villa",
  description:
    "Discover premium luxury properties, villas, and apartments across Egypt powered by AI advisory.",
  keywords: [
    "Flat&Villa",
    "luxury real estate",
    "AI investment",
    "property investment",
    "Egypt real estate",
    "villas",
    "apartments",
  ],
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230B132B'/><rect x='5' y='5' width='90' height='90' rx='16' fill='none' stroke='%23D4AF37' stroke-width='4' stroke-opacity='0.5'/><text x='50' y='65' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='46' fill='%23D4AF37' letter-spacing='-1'>FV</text></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230B132B'/><rect x='5' y='5' width='90' height='90' rx='16' fill='none' stroke='%23D4AF37' stroke-width='4' stroke-opacity='0.5'/><text x='50' y='65' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='46' fill='%23D4AF37' letter-spacing='-1'>FV</text></svg>",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakartaSans.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
