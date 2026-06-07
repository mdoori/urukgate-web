import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "URUK Gate | Your Gateway to Digital Growth",
    template: "%s | URUK Gate",
  },
  description:
    "Professional web and mobile app development for small and local businesses. Book a free consultation today.",
  keywords: ["web development", "mobile app", "small business software", "custom apps", "software development", "URUK Gate"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "URUK Gate",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
