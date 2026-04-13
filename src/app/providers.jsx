"use client";

import { ChronogroveNextAppShell } from "@chronogrove/ui/next";

/**
 * ChronogroveNextAppShell’s inner Box is not a flex container, so `flex-1` on `<main>` would not
 * allocate height and AG Grid (`h-full`) collapsed to 0px. This column establishes the viewport
 * height chain for header + main without changing @chronogrove/ui.
 */
export default function Providers({ children }) {
  return (
    <ChronogroveNextAppShell>
      {/* h-screen (not min-h-screen) so header + main split a definite viewport height; avoids 0-height main */}
      <div className="flex h-screen min-h-0 w-full flex-col">{children}</div>
    </ChronogroveNextAppShell>
  );
}
