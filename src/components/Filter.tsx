import { useMemo, useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Label, Input } from "reactstrap";

interface GlobalFilterProps {
  globalFilter: string | undefined;
  setGlobalFilter: (value: string | undefined) => void;
}

// Component for Global Filter
export function GlobalFilter({ globalFilter, setGlobalFilter }: GlobalFilterProps) {
  const [value, setValue] = useState<string | undefined>(globalFilter);

  const onChange = useAsyncDebounce((value: string | undefined) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="search_input">
      <Input
        value={value || ""}
        onChange={(e) => {
          const inputValue = e.target.value;
          setValue(inputValue);
          onChange(inputValue);
        }}
        placeholder=" Search "
        className="w-25"
        style={{
          fontSize: "14px",
          margin: "15px",
          display: "inline",
        }}
      />
    </div>
  );
}

interface DefaultFilterForColumnProps {
  column: {
    filterValue: string | undefined;
    preFilteredRows: {
      length: number;
    };
    setFilter: (value: string | undefined) => void;
  };
}

// Component for Default Column Filter
export function DefaultFilterForColumn({
  column: {
    filterValue,
    preFilteredRows: { length },
    setFilter,
  },
}: DefaultFilterForColumnProps) {
  // Remove Individual search 
  // return (
  //   <Input
  //     value={filterValue || ""}
  //     onChange={(e) => {
  //       // Set undefined to remove the filter entirely
  //       setFilter(e.target.value || undefined);
  //     }}
  //     placeholder={`Search ...`}
  //     style={{ marginTop: "10px" }}
  //   />
  // );
}

interface SelectColumnFilterProps {
  column: {
    filterValue: string | undefined;
    setFilter: (value: string | undefined) => void;
    preFilteredRows: {
      values: (string | number)[];
    }[];
    id: string;
  };
}

// Component for Custom Select Filter
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: SelectColumnFilterProps) {
  // Use preFilteredRows to calculate the options
//   const options = useMemo(() => {
//     const options = new Set<string | number>();
//     preFilteredRows.forEach((row) => {
//       options.add(row.values[id]);
//     });
//     return [...options.values()];
//   }, [id, preFilteredRows]);

  // UI for Multi-Select box filter
  // Remove Individual Filter 
  // return (
  //   <select
  //     value={filterValue || ""}
  //     onChange={(e) => {
  //       setFilter(e.target.value || undefined);
  //     }}
  //   >
  //     <option value="">All</option>
  //     {options.map((option, i) => (
  //       <option key={i} value={option}>
  //         {option}
  //       </option>
  //     ))}
  //   </select>
  // );
}
