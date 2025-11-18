import { Navbar } from "@/components/sections/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Equi",
    alternateName: "Equi Alternatives Platform",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logos/EQUI-LOGO-SM-HZ-BLACK.png`,
    description: siteConfig.description,
    slogan: "Your Institutional-Grade Alternatives Program, White Labeled to Your Brand",
    foundingDate: "2023",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Custom Hedge Fund Programs",
      "Portable Alpha Solutions",
      "Liquid Alternatives Platform",
      "RIA Technology Solutions",
      "Alternative Investment Management",
    ],
    audience: {
      "@type": "Audience",
      audienceType: [
        "RIA CIOs",
        "Wealth Advisors",
        "Family Office CIOs",
        "Registered Investment Advisors",
        "Investment Committees",
      ],
    },
    brand: {
      "@type": "Brand",
      name: "Equi",
    },
    sameAs: [
      siteConfig.links.twitter,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Equi Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Platform Design Workshop",
            description: "60-90 minute design session with client mix & model analysis, revenue projection modeling, and platform architecture blueprint",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Managed Platform",
            description: "Full-service custom evergreen fund structure with manager selection, ongoing portfolio management, and advisor education",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Partnership",
            description: "Multi-series fund architecture with revenue participation structures for multi-billion dollar firms",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto border-x relative">
            <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10"></div>
            <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10"></div>
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
