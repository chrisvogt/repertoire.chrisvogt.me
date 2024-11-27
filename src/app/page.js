'use client';

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const columnDefs = [
  {
    field: 'Title',
    headerName: 'Title',
    filter: 'agTextColumnFilter',
    sortable: true,
    flex: 2
  },
  {
    field: 'Artists',
    headerName: 'Artist(s)',
    filter: 'agTextColumnFilter',
    sortable: true,
    flex: 2
  },
  {
    field: 'Quality',
    headerName: 'Performance Quality',
    filter: 'agTextColumnFilter',
    sortable: true,
    flex: 1,
  },
  {
    field: 'Transpose',
    headerName: 'Transpose',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: 70,
    minWidth: 50,
    flex: 1,
  },
  {
    field: 'Link',
    headerName: 'Link',
    cellRenderer: params => {
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
      return '';
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
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Error fetching song data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleResize = () => {
    if (gridApi) {
      const width = window.innerWidth;

      // Update column visibility based on screen width
      if (width < 768) {
        gridApi.setColumnVisible('Quality', false);
        gridApi.setColumnVisible('Transpose', false);
      } else {
        gridApi.setColumnVisible('Quality', true);
        gridApi.setColumnVisible('Transpose', true);
      }
    }
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gridApi]);

  const onGridReady = params => {
    setGridApi(params.api);

    // Apply column visibility based on initial window size
    const width = window.innerWidth;
    if (width < 768) {
      params.api.setColumnVisible('Quality', false);
      params.api.setColumnVisible('Transpose', false);
    }
  };

  return (
    <div className="ag-theme-quartz-auto-dark h-full w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        loadingOverlayComponentFramework={() => (
          <span className="ag-overlay-loading-center">Loading songs...</span>
        )}
        noRowsOverlayComponentFramework={() => (
          <span className="ag-overlay-no-rows-center">No Rows to Show</span>
        )}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default HomePage;
