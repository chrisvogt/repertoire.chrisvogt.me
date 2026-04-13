"use client";

import { Box, Heading } from "@theme-ui/components";
import ColorToggle from "@chronogrove/ui/color-toggle";

export default function SiteHeader() {
  return (
    <Box
      as="header"
      sx={{
        position: "relative",
        py: 5,
        borderBottom: "1px solid",
        borderBottomColor: "gray.6",
        bg: "panel-background",
        boxShadow: "default",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: [2, 3],
          right: [2, 3],
        }}
      >
        <ColorToggle />
      </Box>
      <Box className="container mx-auto px-4">
        <Heading
          as="h1"
          sx={{
            fontSize: [4, 5],
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
            color: "text",
          }}
        >
          My Piano Repertoire
        </Heading>
        <Box sx={{ textAlign: "center" }}>
          <Box
            as="a"
            href="https://docs.google.com/spreadsheets/d/1IRqgQCXxQ0KEqAdV119wN3FdhwVe_vtVjjPaowS5vFA/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: 1,
              color: "textMuted",
              textDecoration: "underline",
              "&:hover": { color: "text" },
            }}
          >
            View Source on Google Sheets
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
