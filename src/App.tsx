import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./App.css";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


//In typescript we have to defined every column data type what type that is
interface Show {
  enterprise_customer_id: string;
  src_sys_cde: string;
  src_sys_cust_nbr: string;
  cust_kind_cde: string;
  brth_dt: string;
  sex_cde: string,
  gndr_cde: string,
  frst_nm: string;
  mddl_nm: string;
  lst_nm: string;
}

function App() {
  
  const columns: GridColDef[] = [
    { field: 'enterprise_customer_id', headerName: 'Enterprise Cust id', width: 150 },
    { field: 'src_sys_cde', headerName: 'System code', width: 150 },
    { field: 'src_sys_cust_nbr', headerName: 'Customer No.', width: 150 },
    { field: 'cust_kind_cde', headerName: 'System code', width: 150 },
    { field: 'brth_dt', headerName: 'Birthdate', width: 150 },
    { field: 'sex_cde', headerName: 'Sex code', width: 150 },
    { field: 'gndr_cde', headerName: 'Gender', width: 150 },
    { field: 'frst_nm', headerName: 'First Name', width: 150 },
    { field: 'mddl_nm', headerName: 'Middle Name', width: 150 },
    { field: 'lst_nm', headerName: 'Last Name', width: 150 },
  ];
 
  // state needed
  const [data, setData] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any>('');
  const [isOpen, setIsOpen] = useState<any>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [nativekey, setNativekey] = useState("");
  const [enterprise, setEnterPrise] = useState("");
  const [selectedDropdown, setSelectDropdown] = useState("");
  const [dropdonData, setDropdownData] = useState<any[]>([]);

  // handle table cell click 
  const handleCellClick = (row: any, column: any) => {
    console.log(`Clicked cell in row ${row.show.type}`);
    setRowData(row.show.type);
    setIsOpen(true);
  };

  // Initial Fetching dummy data api from  online DB and showing in table 
  // You can download data using Your Api
  useEffect(() => {
    fetchData();
  }, []);


// Fetching dummy data api from  online DB and showing in table using searchTerm
// debouncing concept implemented
// You can override with your DB
  useEffect(() => {
    const getData = setTimeout(() => {
      if(searchTerm !== ""){
        axios
        .get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
        .then((response) => {
          setData(response.data);
        });
      }   
    }, 2000)
    return () => clearTimeout(getData)
  }, [searchTerm])

  const fetchData = async () => {
    try {
      const sample_response = {
        "id": 1,
        "enterprise_customer_id": "DEFAULT",
        "src_sys_cde": "CIF  ",
        "src_sys_cust_nbr": "301722990",
        "cust_kind_cde": "INDIV",
        "brth_dt": "2013-05-29",
        "sex_cde": "M",
        "gndr_cde": null,
        "frst_nm": "Irving",
        "mddl_nm": null,
        "lst_nm": "Boat",
        "orzn_nm": null,
        "first_name_search": null,
        "last_name_search": null,
        "match_result": null,
        "match_date_time": null,
        "last_updated_date_time": null
      }
      //const response = await axios.get<Show[]>('http://api.tvmaze.com/search/shows?q=animals');

      console.log("Neeraj data", data);
      setDropdownData([sample_response.src_sys_cde]);

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

  // submit handler 
  const submitHandler = () => {
    if ((selectedDropdown !=="" && nativekey !== "") || (selectedDropdown !== "" && enterprise !== "")) {
      try {
        const sample_response = {
          "id": 1,
          "enterprise_customer_id": "DEFAULT",
          "src_sys_cde": "CIF  ",
          "src_sys_cust_nbr": "301722990",
          "cust_kind_cde": "INDIV",
          "brth_dt": "2013-05-29",
          "sex_cde": "M",
          "gndr_cde": null,
          "frst_nm": "Irving",
          "mddl_nm": null,
          "lst_nm": "Boat",
          "orzn_nm": null,
          "first_name_search": null,
          "last_name_search": null,
          "match_result": null,
          "match_date_time": null,
          "last_updated_date_time": null
        }
        //const response = await axios.get<Show[]>('http://api.tvmaze.com/search/shows?q=animals');
  
        setData([sample_response]);
  
      } catch (err: any) {
        const errorMessage = "Error: " + err.message;
        console.log(errorMessage);
      } finally {
        console.log("finally");
      }
    }else {
      alert("Please select appropriat option...");
    }

  }

  // cancel handler 
  const cancelHandler = () => {
     setNativekey("");
     setEnterPrise(""); 
     setSelectDropdown("");
     setData([]);
  }

  return (
    <div className="App">
        <div className="section">
          <div className="section__title">
            <h6>Search By Customer</h6>
            <p>*One of the following is required: Enterprise ID, Native key/source system</p>
         </div>
         <div className="section__body">
            <div className="source_system">
              <select id="source_dropdown" 
                      value={selectedDropdown} 
                      onChange={(e) => setSelectDropdown(e.target.value)}>
                <option value="">Select</option>
                {dropdonData && (
                  dropdonData?.map((item :any , index)=>{
                   return <option key={index} value={item.trim()}>{item.trim()}</option>
                  })
                )}
              </select>
              <input type="text" 
                 value={nativekey}
                 name="native_key"
                 onChange={(e) => setNativekey(e.target.value)} 
                 className="native__key" 
                 placeholder="Native Key"/>
            </div>
            <div className="enterprise__search">
              <input type="text" 
                 value={enterprise}
                 onChange={(e) => setEnterPrise(e.target.value)}
                 name="enterprise" 
                 className="enterprise" 
                 placeholder="Enterprise Id"/>
            </div>
            <div className="section__buttons">
               <button className="action__buton" onClick={submitHandler}>Submit</button>
               <button className="action__buton" onClick={cancelHandler}>Reset</button> 
            </div>
         </div>

        </div>
        { data.length > 0 ? (<div className="section__table_body"> 
          <div className="data-table-search">
            <label className="icon"></label>
            <input type="text" 
                  value={searchTerm}
                  name="filterDataTable" 
                  onChange={searchHandler} 
                  className="filter-text" 
                  placeholder="Search"/>
          </div>
        <div style={{ height: 300, width: '100%' }}>
         <DataGrid 
            rows={data} 
            columns={columns} 
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}/>
        </div>
        <Popup open={isOpen} modal nested onClose={() => setIsOpen(false)}>
          {
            (
              <> 
                  { rowData } 
              </>
            )
          }
        </Popup>
      </div>) : null}
    </div>
  );
}

export default App;
