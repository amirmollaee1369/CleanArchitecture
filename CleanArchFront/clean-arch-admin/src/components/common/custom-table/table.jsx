import React from "react";
import TableBody from "./table-body";
import TableHeader from "./table-header";
const Table = ({columns,onSort,sortColumn,data,onDelete}) => {
  
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></TableHeader>
      <TableBody data={data} onDelete={onDelete} columns={columns} />
    </table>
  );
};

export default Table;
