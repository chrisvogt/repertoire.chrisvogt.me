"use client";

import { Container, Flex } from "@theme-ui/components";

import { articleColumnContainerSx } from "../constants/article-column-container-sx";

/**
 * Same outer rhythm as blog index / post templates: `py: 3` + `Container` with article column width.
 */
export default function ArticleColumnShell({ children }) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        flexGrow: 1,
        position: "relative",
        py: 3,
        minHeight: 0,
      }}
    >
      <Container
        sx={{
          ...articleColumnContainerSx,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {children}
      </Container>
    </Flex>
  );
}
