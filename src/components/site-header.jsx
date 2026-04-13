"use client";

/**
 * Temporary repertoire chrome: mirrors `gatsby-theme-chronogrove` `TopNavigation` layout
 * (brand + color toggle on the left, primary actions on the right). Replace with the shared
 * header once `@chronogrove/ui` publishes an app-shell / navigation export.
 *
 * @see gatsby-theme-chronogrove/theme/src/components/top-navigation.js
 */

import { Box, Container } from "@theme-ui/components";
import ColorToggle from "@chronogrove/ui/color-toggle";
import ActionButton from "@chronogrove/ui/action-button";
import { ExternalLinkIcon } from "@chronogrove/ui/external-link-icon";

const CHRISVOGT_ORIGIN = "https://www.chrisvogt.me";
const REPERTOIRE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1IRqgQCXxQ0KEqAdV119wN3FdhwVe_vtVjjPaowS5vFA/edit?usp=sharing";

export default function SiteHeader() {
  return (
    <Box
      as="header"
      role="banner"
      sx={{
        variant: "styles.TopNavigation",
        minHeight: "64px",
        color: "text",
        bg: "panel-background",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: ["column", null, "row"],
          alignItems: ["flex-start", null, "center"],
          justifyContent: "space-between",
          py: 3,
        }}
      >
        {/* Left: brand + color toggle (matches TopNavigation) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: [2, null, 0],
            width: ["100%", null, "auto"],
          }}
        >
          <Box
            as="a"
            href={CHRISVOGT_ORIGIN}
            sx={{
              variant: "styles.a",
              color: "text",
              display: "inline",
              fontFamily: "heading",
              fontSize: [2, 3],
              fontWeight: "bold",
              letterSpacing: "1.1px",
              marginRight: 2,
              textDecoration: "none",
            }}
          >
            chrisvogt.me
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ColorToggle />
          </Box>
        </Box>

        {/* Right: sheet CTA */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: ["flex-start", null, "flex-end"],
            alignItems: "center",
            width: ["100%", null, "auto"],
          }}
        >
          <ActionButton
            href={REPERTOIRE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Opens in a new tab"
            variant="primary"
            size="medium"
            icon={<ExternalLinkIcon />}
          >
            View Google Sheet
          </ActionButton>
        </Box>
      </Container>
    </Box>
  );
}
