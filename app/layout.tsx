import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deltachialberta.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Delta Chi Alberta | Delta Chi Alberta, Canada – Brotherhood of a Lifetime",
    template: "%s | Delta Chi Alberta",
  },
  description:
    "Delta Chi Fraternity at the University of Alberta. Brotherhood of a lifetime. Promoting friendship, developing character, advancing justice. Delta Chi Alberta, Canada – your home for fraternity brotherhood in Alberta.",
  keywords: [
    "Delta Chi Alberta",
    "Delta Chi Alberta, Canada",
    "Delta Chi",
    "Delta Chi fraternity",
    "University of Alberta fraternity",
    "Delta Chi University of Alberta",
    "fraternity Canada",
    "Greek life Alberta",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "Delta Chi Alberta",
    title: "Delta Chi Alberta | Delta Chi Alberta, Canada – Brotherhood of a Lifetime",
    description:
      "Delta Chi Fraternity at the University of Alberta. Brotherhood of a lifetime. Join Delta Chi Alberta, Canada.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Chi Alberta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta Chi Alberta | Delta Chi Alberta, Canada",
    description: "Brotherhood of a lifetime. Delta Chi Fraternity in Alberta.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add when you have them: google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Delta Chi Alberta",
  alternateName: ["Delta Chi Alberta, Canada", "Delta Chi Fraternity Alberta"],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Delta Chi Fraternity chapter at the University of Alberta. Brotherhood of a lifetime. Part of Delta Chi Alberta, Canada.",
  sameAs: [
    "https://www.instagram.com/uofadchi",
    "https://www.facebook.com/deltachialberta",
    "https://deltachi.org",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "The Delta Chi Fraternity",
    url: "https://deltachi.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
