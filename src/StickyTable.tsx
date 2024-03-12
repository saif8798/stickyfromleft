import React, { useCallback, useState } from "react";
import "./StickyTable.css";
import {
  TablePagination,
  Paper,
  Box,
  CircularProgress,
  Collapse,
  Stack,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Td: React.FC<{
  children: any;
  index: number;
  stickyLeft: number;
  left: number;
}> = ({ children, index, stickyLeft, left }) => {
  if (index <= stickyLeft - 1) {
    return (
      <td
        className="sticky-column"
        style={{
          left: left,
          padding: "10px",
          fontSize: "12px",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        }}
      >
        {children}
      </td>
    );
  } else {
    return (
      <td
        style={{
          padding: "10px",
          fontSize: "12px",
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        }}
      >
        {children}
      </td>
    );
  }
};
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
  tablePagination?: { pageNo: number; perPage: number };
  totalcount?: number;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  width?: any;
};

type StickyTableRowProps = StickyTableProps & {
  row: any;
  openId: number;
  setOpenId: (id: any) => void;
};

const Row: React.FC<StickyTableRowProps> = ({
  row,
  stickyLeft,
  columns,
  nestedColumns,
  nestedData = [],
  onDeepDive = () => null,
  deepDiveIsLoading = false,
  nestedPagination = true,
  openId,
  setOpenId,
  columnBuffer = 8,
  isDeepDive,
  width,
}) => {
  const employeeId = row?.userid || row?.userId;
  const open = employeeId === openId;

  const getRows = (row: any) => {
    return (
      <>
        {columns?.map((column, index: number) =>
          column?.renderCell ? (
            <Td
              key={column.headerName}
              index={index}
              stickyLeft={stickyLeft}
              left={index === 0 ? 0 : 100 * index}
            >
              {column?.renderCell(row)}
            </Td>
          ) : (
            <Td
              key={column.headerName}
              index={index}
              stickyLeft={stickyLeft}
              left={index === 0 ? 0 : 100 * index}
            >
              {row[column?.field]}
            </Td>
          )
        )}
        <td
          style={{
            padding: "10px",
            fontSize: "12px",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          Table Data
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "12px",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          Table Data
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "12px",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          Table Data
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "12px",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          Table Data
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "12px",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          Table Data
        </td>
      </>
    );
  };
  const handleOpenId = () => {
    if (openId === -1) {
      return employeeId;
    } else {
      if (open) {
        return -1;
      } else {
        return employeeId;
      }
    }
  };
  const onClickHandleDeepDive = useCallback(
    function () {
      if (typeof isDeepDive == "undefined" || isDeepDive) {
        if (openId !== employeeId) {
          setOpenId(() => handleOpenId());
          if (openId !== employeeId) {
            onDeepDive(employeeId);
          }
        } else {
          onDeepDive(employeeId);
        }
        setOpenId(() => handleOpenId());
        if (openId !== employeeId) {
          onDeepDive(employeeId);
        }
      }
    },
    [openId, employeeId]
  );

  const getRowIdHandler = useCallback(function (row: any) {
    return Math.random().toString();
  }, []);

  const noRowsOverLay = useCallback(
    () => (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No Records Found
      </Stack>
    ),
    []
  );

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, overflowX: "auto" }}
        className={"tableRow"}
        onClick={onClickHandleDeepDive}
      >
        {getRows(row)}
      </TableRow>
      <TableRow className={"tableRow"}>
        {deepDiveIsLoading && openId === employeeId && (
          <Box className={"deepDiveLoader"}>
            <CircularProgress
              size={20}
              data-testid="Nested-Circular-progress"
            />
          </Box>
        )}
        {nestedData?.length > 0 ? (
          <TableCell
            colSpan={10}
            className={`${"collapsible"} ${!open && "noPadding"}`}
          >
            <Collapse
              in={openId === employeeId}
              timeout="auto"
              unmountOnExit
              className={"collapsible"}
            >
              <div
                style={{
                  height: nestedData.length >= 5 ? 300 : "auto",
                  width: width || "100%",
                }}
              >
                <DataGrid
                  columnBuffer={columnBuffer}
                  pagination={nestedPagination ? true : undefined}
                  autoPageSize
                  autoHeight={nestedData.length >= 5 ? undefined : true}
                  hideFooter={!nestedPagination}
                  paginationMode="client"
                  rowsPerPageOptions={nestedPagination ? [] : [5]}
                  rowCount={nestedData.length}
                  rows={nestedData}
                  columns={nestedColumns}
                  pageSize={nestedPagination ? 100 : nestedData.length}
                  loading={deepDiveIsLoading}
                  getRowId={getRowIdHandler}
                  className={"gridcss"}
                  components={{
                    NoRowsOverlay: noRowsOverLay,
                  }}
                />
              </div>
            </Collapse>
          </TableCell>
        ) : (
          open &&
          !deepDiveIsLoading && (
            <TableCell colSpan={12} className={"noRecordsCell"}>
              No Records found
            </TableCell>
          )
        )}
      </TableRow>
    </React.Fragment>
  );
};

const StickyTable: React.FC<StickyTableProps> = ({
  stickyLeft,
  rows,
  columns,
  nestedColumns,
  nestedData,
  loading = false,
  onDeepDive,
  deepDiveIsLoading = false,
  nestedPagination = true,
  isDeepDive,
  onPageChange = () => {},
  tablePagination = { pageNo: 0, perPage: 0 },
  totalcount = 0,
  onRowsPerPageChange = () => {},
  width = "100%",
}) => {
  const [openId, setOpenId] = useState<any>(-1);

  const getHeaders = (column: any, index: number, loading: boolean) => {
    const left = loading ? "auto" : undefined;
    if (index <= stickyLeft - 1) {
      return (
        <th
          style={{
            width: column.width,
            left: left || index === 0 ? 0 : 100 * index,
            color: "#747379",
            fontSize: "10.7px",
            fontStyle: "normal",
            fontWeight: "600",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            padding: "10px",
            backgroundColor: "rgb(221, 232, 236)",
          }}
          className="sticky-header"
        >
          {column.headerName}
        </th>
      );
    } else {
      return (
        <th
          className={"tableHead sticky-header"}
          style={{ width: column.width || "100px" }}
        >
          {column.headerName}
        </th>
      );
    }
  };

  return (
    <Paper variant="outlined">
      <TableContainer
        sx={{
          maxHeight: 460,
        }}
        className="sticky-table-container"
      >
        <Table className="sticky-table">
          <TableHead>
            <TableRow>
              {columns.map((column, index: number) =>
                getHeaders(column, index, loading)
              )}
              <th className={"tableHead sticky-header"} style={{ width: 100 }}>
                large Header
              </th>
              <th className={"tableHead sticky-header"} style={{ width: 100 }}>
                large Header
              </th>
              <th className={"tableHead sticky-header"} style={{ width: 100 }}>
                large Header
              </th>
              <th className={"tableHead sticky-header"} style={{ width: 100 }}>
                large Header
              </th>
              <th className={"tableHead sticky-header"} style={{ width: 100 }}>
                large Header
              </th>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Box className={"body"}>
                    <CircularProgress data-testid="Circular-progress" />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No Records found
                  </TableCell>
                </TableRow>
              )}
              {rows?.length > 0 &&
                rows.map((row) => (
                  <Row
                    {...{
                      key: row?.employeeName,
                      row,
                      rows,
                      columns,
                      nestedColumns,
                      nestedData,
                      onDeepDive,
                      deepDiveIsLoading,
                      nestedPagination,
                      openId,
                      setOpenId,
                      isDeepDive,
                      width,
                      stickyLeft,
                    }}
                  />
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        page={tablePagination.pageNo}
        rowsPerPage={tablePagination.perPage}
        rowsPerPageOptions={[10, 20, 50]}
        count={totalcount || 0}
        component={Paper}
        elevation={0}
        onPageChange={(_event, newPage: number) => {
          onPageChange(newPage);
        }}
        onRowsPerPageChange={(_event) => {
          onRowsPerPageChange(parseInt(_event.target.value));
        }}
      />
    </Paper>
  );
};

export default StickyTable;
