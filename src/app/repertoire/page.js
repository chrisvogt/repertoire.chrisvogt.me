'use client';

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const RepertoirePage = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnDefs = [
    { field: 'Title', headerName: 'Title', filter: 'agTextColumnFilter', sortable: true },
    { field: 'Artists', headerName: 'Artists', filter: 'agTextColumnFilter', sortable: true },
    { field: 'Genres', headerName: 'Genres', filter: 'agTextColumnFilter', sortable: true },
    { field: 'Quality', headerName: 'Quality', filter: 'agTextColumnFilter', sortable: true },
    { field: 'Transpose', headerName: 'Transpose', filter: 'agTextColumnFilter', sortable: true },
    {
      field: 'Link',
      headerName: 'Sheet Music Link',
      cellRenderer: params => {
        if (params.value) {
          return `<a href="${params.value}" target="_blank" rel="noopener noreferrer">View</a>`;
        }
        return '';
      },
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
        const response = await fetch('/api/songs'); // Fetch songs from your API endpoint
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
    <div
      className="ag-theme-quartz-auto-dark"
      style={{ height: '600px', width: '100%', padding: '20px' }}
    >
      <h1>Repertoire</h1>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        overlayLoadingTemplate={
          loading
            ? '<span class="ag-overlay-loading-center">Loading songs...</span>'
            : null
        }
      />
    </div>
  );
};

export default RepertoirePage;