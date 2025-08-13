import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StickyHeader from "./ui/components/navs/StickyHeader";
import Footer from "./ui/components/sections/Footer";
import { AuthProvider } from "./Providers";
import QueryProvider from "./ui/components/providers/QueryProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bdocs - Your Reading Adventure Starts Here",
  description: "Discover your next favorite book. Browse thousands of titles, from bestsellers to hidden gems. Your reading adventure starts here.",
  keywords: ["books", "reading", "e-commerce", "bookstore", "literature", "novels"],
  authors: [{ name: "Clifford Gyan" }],
  creator: "Clifford Gyan",
  publisher: "Bdocs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bdocs.com'),
  openGraph: {
    title: "Bdocs - Your Reading Adventure Starts Here",
    description: "Discover your next favorite book. Browse thousands of titles, from bestsellers to hidden gems.",
    url: 'https://bdocs.com',
    siteName: 'Bdocs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bdocs - Your Reading Adventure Starts Here',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bdocs - Your Reading Adventure Starts Here",
    description: "Discover your next favorite book. Browse thousands of titles, from bestsellers to hidden gems.",
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" className={`${inter.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#f2741a" />
        </head>
        <body className={`${inter.className} h-screen flex flex-col antialiased`}>
          <AuthProvider>
            <StickyHeader />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
