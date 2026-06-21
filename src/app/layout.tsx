import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/ui/MobileStickyBar";
import HeaderWrapper from "@/components/layout/HeaderWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import LandingStickyCta from "@/components/layout/LandingStickyCta";
import HtmlLangSync from "@/components/layout/HtmlLangSync";
import LanguageSuggestion from "@/components/layout/LanguageSuggestion";
import { COMPANY } from "@/lib/company-data";
// import Analytics from "@/components/Analytics"; // Umami Analytics 적용 시 주석 해제

export const metadata: Metadata = {
  metadataBase: new URL("https://deepingsource.io"),
  title: "DeepingSource | Anonymized Spatial AI — 모든 매장을 한 매장처럼",
  description: "딥핑소스는 익명화 공간 AI로 모든 오프라인 공간을 안전하게 이해하고 최적화합니다. store insight · store agent · store care · SAAI.",
  alternates: {
    canonical: 'https://deepingsource.io',
    languages: {
      'x-default': 'https://deepingsource.io',
      en: 'https://deepingsource.io',
      ko: 'https://deepingsource.io/ko',
      ja: 'https://deepingsource.io/jp',
    },
  },
  keywords: ["DeepingSource", "딥핑소스", "Anonymized Spatial AI", "SAAI", "store insight", "store agent", "store care", "익명화 AI", "공간 AI", "CCTV AI", "프라이버시 AI"],
  authors: [{ name: "DeepingSource" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "DeepingSource | Anonymized Spatial AI",
    description: "익명화 공간 AI로 모든 오프라인 공간을 안전하게 이해하고 최적화합니다. 모든 매장을 한 매장처럼.",
    url: "https://deepingsource.io",
    siteName: "DeepingSource",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DeepingSource — Anonymized Spatial AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepingSource | Anonymized Spatial AI",
    description: "익명화 공간 AI로 모든 오프라인 공간을 안전하게 이해하고 최적화합니다. 모든 매장을 한 매장처럼.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#376AE2",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DeepingSource",
    url: "https://deepingsource.io",
    description: "익명화 공간 AI로 모든 오프라인 공간을 안전하게 이해하고 최적화합니다.",
    publisher: { "@type": "Organization", "@id": "https://deepingsource.io/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://deepingsource.io/#organization",
    name: "DeepingSource (딥핑소스)",
    url: "https://deepingsource.io",
    description: "딥핑소스는 익명화 공간 AI로 모든 오프라인 공간을 안전하게 이해하고 최적화합니다. store insight · store agent · store care · SAAI.",
    foundingDate: String(COMPANY.foundingYear),
    sameAs: ["https://www.deepingsource.io", "https://storecare.ai", "https://saai.store"],
    logo: { "@type": "ImageObject", url: "https://deepingsource.io/icon.svg" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "5F 508, Eonju-ro",
      addressLocality: "Seoul",
      addressRegion: "Gangnam-gu",
      addressCountry: "KR",
    },
    memberOf: {
      "@type": "Organization",
      name: "NVIDIA Inception Program",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@deepingsource.io",
      contactType: "customer service",
      availableLanguage: ["Korean", "English", "Japanese"],
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root shell stays static (SSG). <html lang> ships a static "en"; HtmlLangSync
  // corrects it (and the skip-link) per locale on the client from the URL prefix
  // (/ko·/jp), with the Korean minisite falling back to ko via the x-site-mode cookie.
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="antialiased audience-corporate layer-company">
        <a
          id="skip-to-content"
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[var(--z-skiplink)] focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:top-2 focus:left-2 focus:rounded-lg focus:shadow-md"
        >
          Skip to content
        </a>
        <HtmlLangSync />
        <LanguageSuggestion />
        {/* ?lp=1 → header hidden; otherwise → normal header */}
        <Suspense fallback={<Header />}>
          <HeaderWrapper />
        </Suspense>
        <main id="main-content" className="pt-16">
          {children}
        </main>
        {/* ?lp=1 → footer/mobileStickyBar hidden; otherwise → shown */}
        <Suspense fallback={<><Footer /><MobileStickyBar /></>}>
          <FooterWrapper />
        </Suspense>
        {/* ?lp=1 → show sticky bottom CTA */}
        <Suspense fallback={null}>
          <LandingStickyCta />
        </Suspense>
        {/* Umami Analytics - 환경 변수 설정 후 주석 해제
        <Analytics />
        */}
      </body>
    </html>
  );
}
