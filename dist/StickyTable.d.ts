import React from "react";
import "./StickyTable.css";
export type StickyTableProps = {
    rows: any[];
    stickyLeft: number;
    loading?: boolean;
    columns: {
        headerName: string;
        field: string;
        renderCell?: (row?: any) => React.ReactNode;
        width?: any;
    }[];
    nestedColumns: {
        headerName: string;
        field: string;
        renderCell?: (row?: any) => React.ReactNode;
    }[];
    nestedData?: any[];
    pagination?: boolean;
    nestedPagination?: boolean;
    onPageChange?: (page: number) => void;
    onDeepDive?: (id?: number) => void;
    deepDiveIsLoading?: boolean;
    columnBuffer?: number;
    isDeepDive?: boolean;
    tablePagination?: {
        pageNo: number;
        perPage: number;
    };
    totalcount?: number;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    width?: any;
};
declare const StickyTable: React.FC<StickyTableProps>;
export default StickyTable;
