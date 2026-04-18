import type { Metadata } from "next";
import { Sora, DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AI Infrastructure Portal",
  description: "Domina la infraestructura digital con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${dmSans.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-cream text-brand-charcoal font-dm-sans selection:bg-brand-yellow/30">
        {children}
      </body>
    </html>
  );
}
