import type { Metadata, Viewport } from "next";
import { Nunito, Fredoka, Caveat, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoadingScreen } from "@/components/loading-screen";
import { LanguageProvider } from "@/context/language";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const fredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: true,
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F02D8A",
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
      <body className={`${nunito.variable} ${fredoka.variable} ${caveat.variable} ${lora.variable} antialiased`}>
        <LanguageProvider>
          <LoadingScreen />
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
