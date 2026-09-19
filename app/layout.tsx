import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://otica-gracinha.vercel.app"
  ),
  title: "Óticas Gracinha | Muito além dos olhos",
  description:
    "Tradição e cuidado em Lagoa Nova. Encontre armações exclusivas e atendimento especializado.",
  openGraph: {
    title: "Óticas Gracinha | Muito além dos olhos",
    description:
      "Tradição e cuidado em Lagoa Nova. Encontre armações exclusivas e atendimento especializado.",
    url: "/",
    siteName: "Óticas Gracinha",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logomarca Óticas Gracinha",
      },
      {
        url: "/images/logo-verde-oliva.png",
        width: 1254,
        height: 1254,
        alt: "Óticas Gracinha - Logo Verde Oliva",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Óticas Gracinha | Muito além dos olhos",
    description:
      "Tradição e cuidado em Lagoa Nova. Encontre armações exclusivas e atendimento especializado.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}