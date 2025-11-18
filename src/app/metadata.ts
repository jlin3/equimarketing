import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    // Core Brand
    "Equi",
    "Equi alternatives",
    "Equi platform",
    
    // Primary Target Audience
    "RIA CIO",
    "RIA Chief Investment Officer",
    "wealth advisor CIO",
    "family office CIO",
    "registered investment advisor platform",
    "RIA alternatives program",
    "RIA investment platform",
    
    // Custom Funds & Programs
    "custom hedge fund programs",
    "white label hedge funds",
    "custom alternatives platform",
    "branded hedge fund program",
    "private label hedge funds",
    "bespoke hedge fund solutions",
    "custom fund platform",
    "white labeled alternatives",
    
    // Portable Alpha
    "portable alpha",
    "portable alpha strategy",
    "portable alpha for RIAs",
    "portable alpha overlay",
    "enhanced equity",
    "equity overlay strategy",
    
    // Alternatives & Asset Classes
    "liquid alternatives",
    "hedge fund alternatives",
    "alternative investments",
    "alternatives management",
    "institutional alternatives",
    "hedge fund platform",
    "alternative asset management",
    "diversified hedge strategies",
    
    // Manager Access
    "mid-market managers",
    "mid-market hedge funds",
    "alternative investment managers",
    "hedge fund manager access",
    "institutional manager platform",
    
    // Solutions & Services
    "evergreen fund structure",
    "custom evergreen funds",
    "hedge fund as a service",
    "turnkey alternatives platform",
    "managed alternatives program",
    "alternatives program management",
    
    // Platform Features
    "advisor proposal tools",
    "investment proposal software",
    "alternatives due diligence",
    "portfolio construction platform",
    "risk overlay strategies",
    
    // Target Markets
    "wealth management solutions",
    "RIA technology platform",
    "family office solutions",
    "institutional investors",
    "high net worth alternatives",
    "UHNW investment solutions",
    
    // Competitive Positioning
    "alternatives marketplace alternative",
    "iCapital alternative",
    "CAIS alternative",
    "Allocate alternative",
    "custom fund builder",
    
    // Geographic
    "alternatives platform USA",
    "hedge fund platform United States",
    "RIA platform New York",
    "wealth management technology",
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
    title: "Equi - Custom Hedge Fund Programs & Portable Alpha Platform for RIA CIOs",
    description: "White-labeled alternatives platform built exclusively for your RIA. Custom hedge funds, portable alpha, and mid-market manager access. Partner with Equi to build institutional-grade liquid alternatives in 6-12 months.",
    siteName: "Equi",
    images: [
      {
        url: `${siteConfig.url}/agent-template-og.png`,
        width: 1200,
        height: 630,
        alt: "Equi - Custom Hedge Fund Programs for RIA CIOs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Equi - Custom Hedge Fund Programs for RIA CIOs",
    description: "Build your white-labeled alternatives platform with custom hedge funds, portable alpha & mid-market managers. Not a marketplace—your custom builder.",
    creator: "@equi",
    images: [`${siteConfig.url}/agent-template-og.png`],
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
  alternates: {
    canonical: siteConfig.url,
  },
  category: "Financial Technology",
  classification: "Financial Services, Investment Management, Hedge Funds, Alternative Investments",
  other: {
    "application-name": "Equi",
    "target-audience": "RIA CIOs, Family Office CIOs, Wealth Advisors, Investment Committees, Financial Institutions",
    "business-type": "B2B Financial Technology Platform",
    "service-area": "United States",
    "industry": "Alternative Investment Management, Hedge Fund Services, RIA Technology",
  },
};
