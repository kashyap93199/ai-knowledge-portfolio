import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteSearchProvider } from "@/components/layout/SiteSearch";
import { getSiteSettings } from "@/lib/queries";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const settings = getSiteSettings();
const siteTitle = settings.siteTitle || "AI Knowledge Portfolio";
const siteDescription =
  settings.siteDescription ||
  "An immersive, interactive portfolio exploring Artificial Intelligence through design, data, and 3D.";
const siteUrl = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteTitle} — Interactive AI Learning Experience`,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "AI portfolio",
    "generative AI",
    "NLP",
    "computer vision",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070f" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline bootstrap: apply the saved theme before React hydrates to avoid a flash.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("ai-portfolio-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteSearchProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SiteSearchProvider>
      </body>
    </html>
  );
}