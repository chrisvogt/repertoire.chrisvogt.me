'use client';

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const HomePage = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnDefs = [
    { field: 'Title', headerName: 'Title', filter: 'agTextColumnFilter', sortable: true, flex: 2 },
    { field: 'Artists', headerName: 'Artists', filter: 'agTextColumnFilter', sortable: true, flex: 2 },
    { field: 'Genres', headerName: 'Genres', filter: 'agTextColumnFilter', sortable: true, flex: 1 },
    {
      field: 'Quality',
      headerName: 'Performance Quality',
      filter: 'agTextColumnFilter',
      sortable: true,
      flex: 1
    },
    {
      field: 'Transpose',
      headerName: 'Transpose',
      filter: 'agTextColumnFilter',
      sortable: true,
      width: 70,
      minWidth: 50,
      flex: 1
    },
    {
      field: 'Link',
      headerName: 'Link',
      cellRenderer: params => {
        if (params.value) {
          return (
            <a href="${params.value}" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              View Sheet Music
            </a>
          );
        }
        return '';
      },
      flex: 1, // Absorb extra space
    },
  ];

  const defaultColDef = {
    flex: 1,
    resizable: true,
    filter: true,
    sortable: true,
  };

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

  return (
    <div className="ag-theme-quartz-auto-dark h-full w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        overlayLoadingTemplate={
          loading
            ? `<span class="ag-overlay-loading-center">Loading songs...</span>`
            : null
        }
      />
    </div>
  );
};

export default HomePage;
