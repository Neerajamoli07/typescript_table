import { SelectColumnFilter } from "../components/Filter";

export const columns = [
    {
      Header: "Animal Name",
      accessor: "show.name",
    },
    {
      Header: "Type",
      accessor: "show.type",
      
    },
    {
      Header: "Language",
      accessor: "show.language",
    },
    {
      Header: "Official Site",
      accessor: "show.officialSite",
      Cell: ({ cell: { value } }: { cell: { value: string | null } }) =>
        value ? <a href={value}>{value}</a> : "-",
    },
    {
      Header: "Rating",
      accessor: "show.rating.average",
      Cell: ({ cell: { value } }: { cell: { value: number | null } }) => value || "-",
    },
    {
      Header: "Status",
      accessor: "show.status",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
  ];