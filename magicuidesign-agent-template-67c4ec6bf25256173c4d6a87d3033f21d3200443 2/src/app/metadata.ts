import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Equi",
    "Custom Hedge Funds",
    "Portable Alpha",
    "RIA Alternatives",
    "White Label Hedge Funds",
    "Mid-Market Managers",
    "Liquid Alternatives",
    "RIA CIO",
    "Alternatives Platform",
    "Hedge Fund Programs",
    "Institutional Alternatives",
    "Wealth Management",
  ],
  authors: [
    {
      name: "Equi",
      url: "https://equi.com",
    },
  ],
  creator: "Equi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@equi",
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
