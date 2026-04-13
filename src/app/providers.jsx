"use client";

import { Box } from "@theme-ui/components";
import { ChronogroveNextAppShell } from "@chronogrove/ui/next";

/**
 * ChronogroveNextAppShell’s inner Box is not a flex container, so `flex: 1` on `<main>` would not
 * allocate height and AG Grid (`h-full`) collapsed to 0px. This column establishes the viewport
 * height chain for header + main without changing @chronogrove/ui.
 */
export default function Providers({ children }) {
  return (
    <ChronogroveNextAppShell>
      <Box
        sx={{
          display: "flex",
          minHeight: 0,
          width: "100%",
          flexDirection: "column",
          // Match prior `h-screen`: stable grid height chain for AG Grid
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </ChronogroveNextAppShell>
  );
}
