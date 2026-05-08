import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noel Futkeu — Official | THE RISE",
  description: "Official platform of Noel Futkeu — 17 goals, 32 games, Eintracht Frankfurt. German striker of Cameroonian descent. THE RISE is live.",
  keywords: ["Noel Futkeu","Eintracht Frankfurt","SpVgg Greuther Fürth","Bundesliga","striker","footballer","Cameroon","Essen","professional football","MaxPromo Digital"],
  authors: [{ name: "MaxPromo Digital", url: "https://maxpromo.digital" }],
  creator: "MaxPromo Digital",
  openGraph: {
    title: "Noel Futkeu — THE RISE | Official",
    description: "17 goals. 32 games. Eintracht Frankfurt. The rise is live.",
    type: "website",
    locale: "en_US",
    siteName: "Noel Futkeu Official",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noel Futkeu — THE RISE",
    description: "17 goals. 32 games. Eintracht Frankfurt. German striker. Cameroonian roots.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
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
