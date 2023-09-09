import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/TableContainer";
import {columns} from "./utility/column";

import "./App.css";

function OldApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://api.tvmaze.com/search/shows?q=animals');
      setData(response.data);
    } catch (err: any) {
      const errorMessage = `Error: ${err.message}`;
      console.log(errorMessage);
    } finally {
      // handle your code if you want as it execute always
      console.log("finally")
    }
  }

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default OldApp;