import type { Metadata } from "next";
import { Nunito_Sans, Sora } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import HeaderFooterWrapper from "@/components/HeaderFooterWrapper/HeaderFooterWrapper";

export const fontNunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "auto",
});

export const fontSora = Sora({
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontNunitoSans.variable} ${fontSora.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <HeaderFooterWrapper>
              {children}
              {modal}
            </HeaderFooterWrapper>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
