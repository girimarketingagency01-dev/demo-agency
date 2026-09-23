import SplashScreen from "@/components/SplashScreen";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/CustomCursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://infinitydigitalmarketing.vercel.app/"
  ),

  title: {
    default:
      "Infinity Digital Marketing | Performance Marketing & Digital Growth",
    template: "%s | Infinity Digital Marketing",
  },

  description:
    "Infinity Digital Marketing helps ambitious brands grow through performance marketing, Meta Ads, Google Ads, social media marketing, web design and development.",

  keywords: [
    "digital marketing agency",
    "performance marketing",
    "Meta Ads",
    "Google Ads",
    "social media marketing",
    "web design and development",
    "digital marketing agency India",
    "Infinity Digital Marketing",
  ],

  authors: [
    {
      name: "Infinity Digital Marketing",
    },
  ],

  creator: "Infinity Digital Marketing",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Infinity Digital Marketing",
    title:
      "Infinity Digital Marketing | Performance Marketing & Digital Growth",
    description:
      "Performance marketing, Meta Ads, Google Ads, social media marketing and web development for ambitious brands.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Infinity Digital Marketing",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Infinity Digital Marketing | Performance Marketing & Digital Growth",
    description:
      "Performance marketing, Meta Ads, Google Ads, social media marketing and web development.",
    images: ["/logo.jpg"],
  },

  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
     <body>
  <SplashScreen />
  
  <CustomCursor />

  <SiteHeader />

  {children}

  <SiteFooter />

</body>
    </html>
  );
}

