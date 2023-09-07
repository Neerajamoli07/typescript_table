import React from "react";
import { useTable, useFilters, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter, DefaultFilterForColumn } from "./Filter";

interface TableProps {
  columns: any[];
  data: any[];
}

interface CustomTableInstance<D extends object> extends ReturnType<typeof useTable> {
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: boolean;
    pageCount: any;
    gotoPage: any;
    nextPage: any;
    previousPage: any;
    setPageSize: any;
    setGlobalFilter: any;
    preGlobalFilteredRows: any;
    state: any;
    // Add any other properties you need here
  }

  interface GlobalFilterProps {
    globalFilter: string | undefined;
    setGlobalFilter: (value: string | undefined) => void;
    preGlobalFilteredRows: any[]; // Add this property
  }

export default function Table({ columns, data }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
    preGlobalFilteredRows,
 
  } = useTable(
    {
      columns,
      data,
    //   state: { pageIndex: 1, pageSize: 5 },
    //   defaultColumn: { Filter: DefaultFilterForColumn },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  ) as CustomTableInstance<any>;

  // Function to get cell value
  const getCellValue = (cell: any) => {
    // setCellValue(cell.value)
    console.log("Neeraj", cell.value);
  }

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "center",
              }}
            >
              {/* rendering global filter */}
              <GlobalFilter
                // preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* rendering column filter */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td   onClick={() => getCellValue(cell)} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="pagination">
        <li className="page-item" onClick={() => gotoPage(0)}>
          <a className="page-link">First</a>
        </li>
        <li className="page-item" onClick={() => previousPage()}>
          <a className="page-link">{'<'}</a>
        </li>
        <li className="page-item" onClick={() => nextPage()}>
          <a className="page-link">{'>'}</a>
        </li>
        <li className="page-item" onClick={() => gotoPage(pageCount - 1)}>
          <a className="page-link">Last</a>
        </li>
        {/* <li>
          <a className="page-link">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </a>
        </li> */}
        {/* <li>
          <a className="page-link">
            <input
              className="form-control"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px', height: '20px' }}
            />
          </a>
        </li>{' '} */}
        <select
          className="form-control"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{ width: '120px', height: '38px' }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> 
      </ul>
    </>
  );
}
