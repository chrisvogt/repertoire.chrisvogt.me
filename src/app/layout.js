import "./globals.css";

import {
  ChronogroveNextEmotionRegistry,
  ChronogroveNextRootLayoutHead,
} from "@chronogrove/ui/next";
import { SkipNavContent } from "@chronogrove/ui/skip-nav";

import ArticleColumnShell from "../components/article-column-shell";
import { chronogroveCrossDomainColorMode } from "../lib/chronogrove-cross-domain-color-mode";
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
        <ChronogroveNextRootLayoutHead crossDomainColorMode={chronogroveCrossDomainColorMode} />
      </head>
      <body suppressHydrationWarning className="shell-body">
        <ChronogroveNextEmotionRegistry>
          <Providers>
            <SiteHeader />
            <main className="shell-main">
              <SkipNavContent className="shell-skip-target">
                <ArticleColumnShell>{children}</ArticleColumnShell>
              </SkipNavContent>
            </main>
          </Providers>
        </ChronogroveNextEmotionRegistry>
      </body>
    </html>
  );
}
