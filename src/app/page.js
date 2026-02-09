"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

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
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Sheet Music
          </a>
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
  const [rowData, setRowData] = useState(null);
  const gridApiRef = useRef(null);

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
    <div className="ag-theme-quartz-auto-dark h-full w-full">
      <AgGridReact
        theme="legacy"
        rowData={rowData ?? []}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Loading songs...</span>"
        overlayNoRowsTemplate="<span class='ag-overlay-no-rows-center'>No Rows to Show</span>"
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default HomePage;
