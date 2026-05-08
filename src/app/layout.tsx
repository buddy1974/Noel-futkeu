import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noel Futkeu — Elite Footballer | Built Different",
  description: "Official platform of Noel Futkeu — professional footballer, Cameroon international, and Europe-ready superstar.",
  keywords: ["Noel Futkeu","footballer","Cameroon","professional football","elite player","scout","MaxPromo Digital"],
  authors: [{ name: "MaxPromo Digital", url: "https://maxpromo.digital" }],
  creator: "MaxPromo Digital",
  openGraph: {
    title: "Noel Futkeu — Built Different",
    description: "The digital home of a future global football icon.",
    type: "website",
    locale: "en_US",
    siteName: "Noel Futkeu Official",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noel Futkeu — Built Different",
    description: "Elite footballer. Cameroon pride. Europe-ready superstar.",
    creator: "@noelfutkeu",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen overflow-x-hidden"
        style={{ background: "#030303", fontFamily: "'Inter','Helvetica Neue',system-ui,sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
