import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/context/language";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const jakartaHeading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B35",
};

export const metadata: Metadata = {
  title: "Selah Kids! | Faith-Based Kids Music",
  description:
    "Selah Kids! presents original and catchy bible songs for kids that are sure to get you and your little one up and moving.",
  keywords: ["christian music", "kids worship", "bible songs", "children music", "selah kids"],
  metadataBase: new URL("https://selah-kids.vercel.app"),
  openGraph: {
    title: "Selah Kids! | Faith-Based Kids Music",
    description: "Original Bible songs with stunning 3D animation that get your little ones up, moving & falling in love with God's word.",
    siteName: "Selah Kids",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selah Kids! | Faith-Based Kids Music",
    description: "Original Bible songs with stunning 3D animation for kids.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.variable} ${jakartaHeading.variable} antialiased`}>
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="min-h-screen outline-none">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
