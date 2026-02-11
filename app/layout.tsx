import { Metadata } from "next";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { Analytics } from "@/components/common/analytics";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/modal-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || 'http://localhost:3000'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    // Primary keywords - Software Development
    "Software Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Web Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    // AI & ML keywords
    "AI Engineer",
    "Applied AI Engineer",
    "Machine Learning Engineer",
    "Data Engineer",
    "AI Developer",
    // Tech stack keywords
    "TypeScript Developer",
    "Python Developer",
    "Node.js Developer",
    "React Native Developer",
    "AWS Developer",
    // Location-based keywords
    "Remote Software Engineer",
    "Freelance Developer",
    "Software Developer for Hire",
    // Project-based keywords
    "Portfolio Website",
    "Web Application Developer",
    "SaaS Developer",
    // Skills keywords
    "React Development",
    "Next.js Development",
    "TypeScript Development",
    "Python Development",
    "API Development",
    "Database Developer",
    ...siteConfig.keywords,
  ],
  authors: [
    {
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.username,
  publisher: siteConfig.authorName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    creator: `@${siteConfig.username}`,
  },
  icons: {
    icon: siteConfig.iconIco,
    shortcut: siteConfig.logoIcon,
    apple: siteConfig.logoIcon,
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Software Development, AI Engineering, Web Development",
  other: {
    "theme-color": "#000000",
    "twitter:site": `@${siteConfig.username}`,
    "twitter:creator": `@${siteConfig.username}`,
    "og:site_name": siteConfig.name,
    "og:type": "website",
    "og:locale": "en_US",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": siteConfig.name,
    "og:description": siteConfig.description,
    "og:title": siteConfig.name,
    "og:url": siteConfig.url,
    // JSON-LD Structured Data for Rich Snippets
    "ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.authorName,
        url: siteConfig.url,
        sameAs: [
          siteConfig.links.github,
          siteConfig.links.twitter,
        ],
        jobTitle: "Applied AI Engineer",
        worksFor: {
          "@type": "Organization",
          name: "Freelance",
        },
        description: siteConfig.description,
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Software Engineering",
          "Full Stack Development",
          "TypeScript",
          "Python",
          "Next.js",
          "React",
          "Data Engineering",
          "Web Development",
          "Backend Development",
          "Frontend Development",
        ],
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Python",
          "Node.js",
          "AWS",
          "MongoDB",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Global",
          addressCountry: "Worldwide",
        },
        areaServed: "Worldwide",
        availableForHire: true,
        hourlyRate: "$100-150",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        description: "Professional software development and AI engineering services",
        url: siteConfig.url,
        image: siteConfig.ogImage,
        priceRange: "$$",
        serviceType: "Software Development",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    ]),
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={[
            "light",
            "dark",
            "retro",
            "cyberpunk",
            "paper",
            "aurora",
            "synthwave",
          ]}
        >
          {children}
          <Analytics />
          <Toaster />
          <ModalProvider />
        </ThemeProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}