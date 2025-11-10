import type { Metadata } from "next";
import { Nunito_Sans, Sora } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import HeaderFooterWrapper from "@/components/HeaderFooterWrapper/HeaderFooterWrapper";

const fontNunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "auto",
});

const fontSora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: "variable",
  display: "auto",
});

export const metadata: Metadata = {
  title: "Подорожники",
  description: "Поділіться з усіма, як ви провели останню подорож",
  icons: {
    icon: [
      { url: "/icons.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/x-icon" },
    ],
  },
  openGraph: {
    title: "Подорожники",
    description: "Поділіться з усіма, як ви провели останню подорож",
    url: "https://podorozhnuky.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1374,
        height: 916,
        alt: "Podorozhnuky logo",
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${fontNunitoSans.variable} ${fontSora.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <HeaderFooterWrapper modal>{children}</HeaderFooterWrapper>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
