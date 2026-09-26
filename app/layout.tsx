import {asset} from '@/lib/asset';
import type { Metadata } from "next";
import "./globals.css";
import '@fontsource/eb-garamond/400.css';
import '@fontsource/eb-garamond/400-italic.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import {SiteMotion} from '@/components/site/experience';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/content';

export const metadata: Metadata = {
  title: {default:"Ducrest Partners | Intellectual Property & Technology Law",template:"%s | Ducrest Partners"},
  description: "Legal advisory, transactional, regulatory and dispute resolution services for creators, technology-driven businesses and creative enterprises in Nigeria.",
  icons: {
    icon: asset('/favicon.svg?v=ducrest-circle-3'),
    shortcut: asset('/favicon.svg?v=ducrest-circle-3'),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><SiteMotion/><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></body>
    </html>
  );
}
