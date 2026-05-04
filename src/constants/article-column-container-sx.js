import { articleColumnContainerSx as chronogroveArticleColumnSx } from "@chronogrove/ui/article-column-container";

/**
 * Base measure from `@chronogrove/ui` (blog / MDX). Wider third breakpoint matches the My Music
 * index on www.chrisvogt.me (`max(95ch, 75vw)`).
 */
export const articleColumnContainerSx = {
  ...chronogroveArticleColumnSx,
  width: ["", "", "max(95ch, 75vw)"],
};
