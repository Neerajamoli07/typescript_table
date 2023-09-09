import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import DataTable from 'react-data-table-component';
import 'reactjs-popup/dist/index.css';
import "./App.css";

//In typescript we have to defined every column data type what type that is
interface Show {
  name: string;
  type: string;
  language: string;
  officialSite: string;
  rating: {
    average: number;
  };
}

function App() {
 /* <Expliantion> In our dummy api these type of key available you can check  by 
  hitting this url http://api.tvmaze.com/search/shows?q=animals directly on browser
  and parse response with any json parser online
  </Explaintion> */
  const columns = [
    {
      name: 'Name',
      selector: (row: any) => row.show.name,
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row: any) => row.show.type,
      sortable: true,
      cell: (row: { show: { type: string } }) => (
        <div
          onClick={() => handleCellClick(row, 'show.type')}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {row.show.type}
        </div>
      ),
    },
    {
      name: 'Language',
      selector: (row: any) => row.show.language,
      sortable: true,
    },
    {
      name: 'Official Site',
      selector: (row: any) => row.show.officialSite,
    },
    {
      name: 'Rating',
      selector: (row: any) => row.show.rating.average,
    },
  ];
  // state needed
  const [data, setData] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>('');
  const [isOpen, setIsOpen] = useState<any>(false);
  const [searchTerm, setSearchTerm] = useState("");

  // handle table cell click 
  const handleCellClick = (row: any, column: any) => {
    console.log(`Clicked cell in row ${row.show.type}`);
    setRowData(row.show.type);
    setIsOpen(true);
  };

  // Fetching api 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Show[]>('http://api.tvmaze.com/search/shows?q=animals');
      setData(response.data);

    } catch (err: any) {
      const errorMessage = "Error: " + err.message;
      console.log(errorMessage);
    } finally {
      console.log("finally");
    }
  }

  // handle search Functionality
  const searchHandler = (e: any) => {
    console.log("user Input...."+ e.target.value);
    console.log("Initial Data..."+data);
    setSearchTerm(e.target.value);
  }

  return (
    <div className="App">
        <div className="data-table-search">
          <label className="icon"></label>
          <input type="text" 
                 value={searchTerm}
                 name="filterDataTable" 
                 onChange={searchHandler} 
                 className="filter-text" 
                 placeholder="Search"/>
        </div>
        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 25, 50]}
          paginationComponentOptions={{
            rowsPerPageText: 'Records per page:',
            rangeSeparatorText: 'out of',
          }}
        />
      <Popup open={isOpen} modal nested onClose={() => setIsOpen(false)}>
        {
          (
            <> 
                { rowData } 
            </>
          )
        }
      </Popup>
    </div>
  );
}

export default App;
