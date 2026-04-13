import "./globals.css";

import {
  ChronogroveNextEmotionRegistry,
  ChronogroveNextRootLayoutHead,
} from "@chronogrove/ui/next";

import Providers from "./providers";
import SiteHeader from "../components/site-header";

export const metadata = {
  title: "My Piano Repertoire | chrisvogt.me",
  description:
    "The piano repertoire of Chris Vogt from San Francisco. Find more on www.chrisvogt.me.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ChronogroveNextRootLayoutHead />
      </head>
      <body
        suppressHydrationWarning
        className="flex h-screen min-h-0 flex-col antialiased"
      >
        <ChronogroveNextEmotionRegistry>
          <Providers>
            <SiteHeader />
            <main className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div className="container mx-auto flex min-h-0 flex-1 flex-col p-4">
                {children}
              </div>
            </main>
          </Providers>
        </ChronogroveNextEmotionRegistry>
      </body>
    </html>
  );
}
