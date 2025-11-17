import type { Metadata } from "next";
import { Nunito_Sans, Sora } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import HeaderFooterWrapper from "@/components/HeaderFooterWrapper/HeaderFooterWrapper";
import { ThemeProvider } from "@/components/ThemeContext/ThemeContext";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${fontNunitoSans.variable} ${fontSora.variable}`}>
        <ThemeProvider>
          <TanStackProvider>
            <AuthProvider>
              <HeaderFooterWrapper modal>{children}</HeaderFooterWrapper>
              <Toaster position="top-center" reverseOrder={false} />
            </AuthProvider>
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
