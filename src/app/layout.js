import "./globals.css";

import {
  ChronogroveNextEmotionRegistry,
  ChronogroveNextRootLayoutHead,
} from "@chronogrove/ui/next";

import ArticleColumnShell from "../components/article-column-shell";
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
      <body suppressHydrationWarning className="shell-body">
        <ChronogroveNextEmotionRegistry>
          <Providers>
            <SiteHeader />
            <main className="shell-main">
              <ArticleColumnShell>{children}</ArticleColumnShell>
            </main>
          </Providers>
        </ChronogroveNextEmotionRegistry>
      </body>
    </html>
  );
}
