import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";
import { hreflangLanguages } from "@/lib/regions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://www.edtreatmenthub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ED Treatment - Compare the Best Online ED Treatment Providers & Prices",
    template: "%s | ED Treatment",
  },
  description:
    "Compare the best online erectile-dysfunction treatments of 2026 - licensed telehealth providers ranked by treatment options, price and real support, from generic pills to compounded formulas.",
  keywords: [
    "ED treatment",
    "erectile dysfunction treatment",
    "best ED medicine",
    "online ED treatment",
    "ED pills online",
    "compounded ED medication",
    "ED telehealth",
    "erectile dysfunction providers",
  ],
  openGraph: {
    title: "ED Treatment - Compare the Best Online ED Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online erectile-dysfunction treatment providers - ranked on treatment, price and support.",
    type: "website",
    siteName: "ED Treatment",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "ED Treatment - Compare the Best Online ED Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online erectile-dysfunction treatment providers.",
  },
  other: {
    "geo.region": "US",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "content-language": "en-US",
  },
  alternates: {
    canonical: SITE_URL,
    languages: hreflangLanguages(SITE_URL, "/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ED Treatment",
              url: SITE_URL,
              areaServed: { "@type": "Country", name: "United States" },
              description:
                "Independent guides and provider comparisons for online erectile-dysfunction treatment - expert reviews, pricing research, and side-by-side comparisons.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ED Treatment",
              url: SITE_URL,
              description:
                "Compare trusted online erectile-dysfunction treatment providers side by side.",
            }),
          }}
        />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
