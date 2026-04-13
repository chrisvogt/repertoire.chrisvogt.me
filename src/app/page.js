"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useColorMode, useThemeUI } from "theme-ui";
import { Box } from "@theme-ui/components";
import PageHeader from "@chronogrove/ui/page-header";
import chronogroveTheme from "@chronogrove/ui/theme";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

/** Theme UI sometimes stores palette aliases (e.g. `tableBackground: 'light'`) instead of CSS strings. */
function chronogroveCssColor(value, fallback) {
  if (typeof value !== "string") return fallback;
  if (value === "light" || value === "transparent") return fallback;
  return value;
}

const columnDefs = [
  {
    field: "Artists",
    headerName: "Artist(s)",
    filter: "agTextColumnFilter",
    sort: "asc", // Set default sort order
    sortable: true,
    flex: 2,
  },
  {
    field: "Title",
    headerName: "Title",
    filter: "agTextColumnFilter",
    sortable: true,
    flex: 2,
  },
  {
    field: "Quality",
    headerName: "Performance Quality",
    filter: "agTextColumnFilter",
    sortable: true,
    flex: 1,
  },
  {
    field: "Transpose",
    headerName: "Transpose",
    filter: "agTextColumnFilter",
    sortable: true,
    width: 70,
    minWidth: 50,
    flex: 1,
  },
  {
    field: "Link",
    headerName: "Link",
    cellRenderer: (params) => {
      if (params.value) {
        return (
          <Box
            as="a"
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sheet Music
          </Box>
        );
      }
      return "";
    },
    flex: 1,
  },
];

const defaultColDef = {
  flex: 1,
  resizable: true,
  filter: true,
  sortable: true,
};

const HomePage = () => {
  const [colorMode] = useColorMode();
  const { theme } = useThemeUI();
  const [rowData, setRowData] = useState(null);
  const gridApiRef = useRef(null);

  const agGridTheme = useMemo(() => {
    const c = theme?.colors ?? {};
    const isDark = colorMode === "dark";
    const pageBg = chronogroveCssColor(c.background, isDark ? "#14141F" : "#fdf8f5");
    const primary = chronogroveCssColor(c.primary, "#422EA3");
    const bodyText = chronogroveCssColor(c.text, isDark ? "#fff" : "#111");
    const tableText = chronogroveCssColor(c.tableText, bodyText);

    /*
     * Fluid type: blog copy uses Theme UI responsive steps + fluid headings (`calc(… + vw)`).
     * AG Grid `withParams` only accepts strings — use `clamp(min, base + vw, max)` with Chronogrove
     * `fontSizes` bounds so cells shrink on narrow viewports instead of staying at fixed rem sizes.
     */
    const sizes = chronogroveTheme.fontSizes;
    const minCell = typeof sizes[0] === "string" ? sizes[0] : "0.875rem";
    const maxCell = typeof sizes[2] === "string" ? sizes[2] : "1.25rem";
    const minHeader = typeof sizes[1] === "string" ? sizes[1] : "1rem";
    const maxHeader = typeof sizes[3] === "string" ? sizes[3] : "1.375rem";
    const fluidCell = `clamp(${minCell}, 0.7rem + 1.15vw, ${maxCell})`;
    const fluidHeader = `clamp(${minHeader}, 0.75rem + 1.2vw, ${maxHeader})`;

    /** AG Grid’s foundation `backgroundColor` should be opaque; data/header layers use dedicated params. */
    const params = {
      accentColor: primary,
      backgroundColor: pageBg,
      foregroundColor: bodyText,
      browserColorScheme: isDark ? "dark" : "light",
      fontFamily: chronogroveTheme.fonts.body,
      fontSize: fluidCell,
      dataFontSize: fluidCell,
      headerFontSize: fluidHeader,
      borderColor: isDark
        ? chronogroveCssColor(c.tableBorder, "rgba(255, 255, 255, 0.12)")
        : "rgba(17, 17, 17, 0.1)",
    };

    if (isDark) {
      /*
       * Chronogrove dark table tokens (@chronogrove/ui theme.js): even rows `tableRowBackground`
       * (purple surface), odd rows `tableRowAlternateBackground` (rgba 30,37,48 — grey-blue),
       * headers `tableHeaderBackground` (same hue as odd rows, higher alpha). That matches MDX
       * tables, but in AG Grid the header band and odd stripes read as duplicate chrome. Use the
       * `@theme-ui/preset-tailwind` `gray` scale from the same theme for header/tooling so the bar is
       * distinct from zebra stripes while staying inside the design system.
       */
      const gray = theme?.colors?.gray;
      const headerChrome =
        Array.isArray(gray) && typeof gray[9] === "string"
          ? gray[9]
          : chronogroveCssColor(c.tableHeaderBackground, "#1a202c");

      params.dataBackgroundColor = chronogroveCssColor(
        c.tableRowBackground,
        "rgba(30, 30, 47, 0.25)"
      );
      params.chromeBackgroundColor = headerChrome;
      params.headerBackgroundColor = headerChrome;
      params.oddRowBackgroundColor = chronogroveCssColor(
        c.tableRowAlternateBackground,
        "rgba(30, 37, 48, 0.5)"
      );
      params.textColor = tableText;
      params.headerTextColor = tableText;
      params.cellTextColor = tableText;
      if (typeof c.textMuted === "string") {
        params.subtleTextColor = c.textMuted;
      }
    } else {
      /*
       * Light: `tableHeaderBackground` / `tableRowAlternateBackground` / `background` from Chronogrove
       * (chronogrove-theme-surface-colors + theme.js). No custom off-palette chrome.
       */
      const headerChrome = chronogroveCssColor(c.tableHeaderBackground, "#f4f4f9");
      params.dataBackgroundColor = chronogroveCssColor(c.background, "#fdf8f5");
      params.chromeBackgroundColor = headerChrome;
      params.headerBackgroundColor = headerChrome;
      params.oddRowBackgroundColor = chronogroveCssColor(
        c.tableRowAlternateBackground,
        "#fafafa"
      );
      params.textColor = tableText;
      params.headerTextColor = tableText;
      params.cellTextColor = tableText;
      if (typeof c.textMuted === "string") {
        params.subtleTextColor = c.textMuted;
      }
    }

    return themeQuartz.withParams(params);
  }, [colorMode, theme]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error("Error fetching song data:", error);
        setRowData([]);
      }
    };

    fetchSongs();
  }, []);

  const updateColumnVisibility = useCallback((api) => {
    if (!api) return;
    
    const width = window.innerWidth;
    const isMobile = width < 768;
    
    // AG Grid v35 uses setColumnsVisible (plural) with array of column IDs
    api.setColumnsVisible(["Quality", "Transpose"], !isMobile);
  }, []);

  const handleResize = useCallback(() => {
    updateColumnVisibility(gridApiRef.current);
  }, [updateColumnVisibility]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const onGridReady = useCallback((params) => {
    gridApiRef.current = params.api;
    updateColumnVisibility(params.api);

    if (rowData === null) {
      params.api.setGridOption("loading", true);
    }
  }, [rowData, updateColumnVisibility]);

  useEffect(() => {
    const api = gridApiRef.current;
    if (!api) return;

    if (rowData === null) {
      api.setGridOption("loading", true);
    } else if (rowData.length === 0) {
      api.showNoRowsOverlay();
      api.setGridOption("loading", false);
    } else {
      api.setGridOption("loading", false);
      api.hideOverlay();
    }
  }, [rowData]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Same component as blog index / MDX posts: `fontSize: [6, calc(1.25em + 2vw)]` */}
      <PageHeader>My Piano Repertoire</PageHeader>
      <Box
        as="p"
        sx={{
          fontSize: [3, 4],
          lineHeight: 1.65,
          color: "textMuted",
          maxWidth: "65ch",
          mt: 0,
          mb: 4,
        }}
      >
        A collection of songs I practice on the piano most often, with links to sheet music where
        available. Sort by <strong>performance quality</strong> to see songs by skill and practice.{" "}
        <strong>Transpose</strong> shows steps to reach the familiar key—usually the key of the most
        popular recording or release.
      </Box>
      {/*
        Flex child with minHeight: 0 gives AG Grid a bounded height; avoid fixed calc now that the
        shell uses a compact TopNavigation-style header.
      */}
      <Box
        sx={{
          flex: 1,
          /* Taller default viewport for long lists (~400 rows); still capped so tiny screens don’t overflow */
          minHeight: ["min(52vh, 360px)", null, "min(68vh, 720px)"],
          width: "100%",
          overflow: "hidden",
          borderRadius: "default",
          boxShadow: "default",
        }}
      >
        <AgGridReact
          theme={agGridTheme}
          rowData={rowData ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Loading songs...</span>"
          overlayNoRowsTemplate="<span class='ag-overlay-no-rows-center'>No Rows to Show</span>"
          onGridReady={onGridReady}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
