"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./StickyTable.css");
const material_1 = require("@mui/material");
const x_data_grid_1 = require("@mui/x-data-grid");
const Td = ({ children, index, stickyLeft, left }) => {
    if (index <= stickyLeft - 1) {
        return (react_1.default.createElement("td", { className: "sticky-column", style: {
                left: left,
                padding: "10px",
                fontSize: "12px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
            } }, children));
    }
    else {
        return (react_1.default.createElement("td", { style: {
                padding: "10px",
                fontSize: "12px",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
            } }, children));
    }
};
const Row = ({ row, stickyLeft, columns, nestedColumns, nestedData = [], onDeepDive = () => null, deepDiveIsLoading = false, nestedPagination = true, openId, setOpenId, columnBuffer = 8, isDeepDive, width, }) => {
    const employeeId = row?.userid || row?.userId;
    const open = employeeId === openId;
    const getRows = (row) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            columns?.map((column, index) => column?.renderCell ? (react_1.default.createElement(Td, { key: column.headerName, index: index, stickyLeft: stickyLeft, left: index === 0 ? 0 : 100 * index }, column?.renderCell(row))) : (react_1.default.createElement(Td, { key: column.headerName, index: index, stickyLeft: stickyLeft, left: index === 0 ? 0 : 100 * index }, row[column?.field]))),
            react_1.default.createElement("td", { style: {
                    padding: "10px",
                    fontSize: "12px",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                } }, "Table Data"),
            react_1.default.createElement("td", { style: {
                    padding: "10px",
                    fontSize: "12px",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                } }, "Table Data"),
            react_1.default.createElement("td", { style: {
                    padding: "10px",
                    fontSize: "12px",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                } }, "Table Data"),
            react_1.default.createElement("td", { style: {
                    padding: "10px",
                    fontSize: "12px",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                } }, "Table Data"),
            react_1.default.createElement("td", { style: {
                    padding: "10px",
                    fontSize: "12px",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                } }, "Table Data")));
    };
    const handleOpenId = () => {
        if (openId === -1) {
            return employeeId;
        }
        else {
            if (open) {
                return -1;
            }
            else {
                return employeeId;
            }
        }
    };
    const onClickHandleDeepDive = (0, react_1.useCallback)(function () {
        if (typeof isDeepDive == "undefined" || isDeepDive) {
            if (openId !== employeeId) {
                setOpenId(() => handleOpenId());
                if (openId !== employeeId) {
                    onDeepDive(employeeId);
                }
            }
            else {
                onDeepDive(employeeId);
            }
            setOpenId(() => handleOpenId());
            if (openId !== employeeId) {
                onDeepDive(employeeId);
            }
        }
    }, [openId, employeeId]);
    const getRowIdHandler = (0, react_1.useCallback)(function (row) {
        return Math.random().toString();
    }, []);
    const noRowsOverLay = (0, react_1.useCallback)(() => (react_1.default.createElement(material_1.Stack, { height: "100%", alignItems: "center", justifyContent: "center" }, "No Records Found")), []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.TableRow, { sx: { "& > *": { borderBottom: "unset" }, overflowX: "auto" }, className: "tableRow", onClick: onClickHandleDeepDive }, getRows(row)),
        react_1.default.createElement(material_1.TableRow, { className: "tableRow" },
            deepDiveIsLoading && openId === employeeId && (react_1.default.createElement(material_1.Box, { className: "deepDiveLoader" },
                react_1.default.createElement(material_1.CircularProgress, { size: 20, "data-testid": "Nested-Circular-progress" }))),
            nestedData?.length > 0 ? (react_1.default.createElement(material_1.TableCell, { colSpan: 10, className: `${"collapsible"} ${!open && "noPadding"}` },
                react_1.default.createElement(material_1.Collapse, { in: openId === employeeId, timeout: "auto", unmountOnExit: true, className: "collapsible" },
                    react_1.default.createElement("div", { style: {
                            height: nestedData.length >= 5 ? 300 : "auto",
                            width: width || "100%",
                        } },
                        react_1.default.createElement(x_data_grid_1.DataGrid, { columnBuffer: columnBuffer, pagination: nestedPagination ? true : undefined, autoPageSize: true, autoHeight: nestedData.length >= 5 ? undefined : true, hideFooter: !nestedPagination, paginationMode: "client", rowsPerPageOptions: nestedPagination ? [] : [5], rowCount: nestedData.length, rows: nestedData, columns: nestedColumns, pageSize: nestedPagination ? 100 : nestedData.length, loading: deepDiveIsLoading, getRowId: getRowIdHandler, className: "gridcss", components: {
                                NoRowsOverlay: noRowsOverLay,
                            } }))))) : (open &&
                !deepDiveIsLoading && (react_1.default.createElement(material_1.TableCell, { colSpan: 12, className: "noRecordsCell" }, "No Records found"))))));
};
const StickyTable = ({ stickyLeft, rows, columns, nestedColumns, nestedData, loading = false, onDeepDive, deepDiveIsLoading = false, nestedPagination = true, isDeepDive, onPageChange = () => { }, tablePagination = { pageNo: 0, perPage: 0 }, totalcount = 0, onRowsPerPageChange = () => { }, width = "100%", }) => {
    const [openId, setOpenId] = (0, react_1.useState)(-1);
    const getHeaders = (column, index, loading) => {
        const left = loading ? "auto" : undefined;
        if (index <= stickyLeft - 1) {
            return (react_1.default.createElement("th", { style: {
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
                }, className: "sticky-header" }, column.headerName));
        }
        else {
            return (react_1.default.createElement("th", { className: "tableHead sticky-header", style: { width: column.width || "100px" } }, column.headerName));
        }
    };
    return (react_1.default.createElement(material_1.Paper, { variant: "outlined" },
        react_1.default.createElement(material_1.TableContainer, { sx: {
                maxHeight: 460,
            }, className: "sticky-table-container" },
            react_1.default.createElement(material_1.Table, { className: "sticky-table" },
                react_1.default.createElement(material_1.TableHead, null,
                    react_1.default.createElement(material_1.TableRow, null,
                        columns.map((column, index) => getHeaders(column, index, loading)),
                        react_1.default.createElement("th", { className: "tableHead sticky-header", style: { width: 100 } }, "large Header"),
                        react_1.default.createElement("th", { className: "tableHead sticky-header", style: { width: 100 } }, "large Header"),
                        react_1.default.createElement("th", { className: "tableHead sticky-header", style: { width: 100 } }, "large Header"),
                        react_1.default.createElement("th", { className: "tableHead sticky-header", style: { width: 100 } }, "large Header"),
                        react_1.default.createElement("th", { className: "tableHead sticky-header", style: { width: 100 } }, "large Header"))),
                loading ? (react_1.default.createElement(material_1.TableBody, null,
                    react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, { colSpan: 12, align: "center" },
                            react_1.default.createElement(material_1.Box, { className: "body" },
                                react_1.default.createElement(material_1.CircularProgress, { "data-testid": "Circular-progress" })))))) : (react_1.default.createElement(material_1.TableBody, null,
                    rows?.length === 0 && (react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, { colSpan: 12, align: "center" }, "No Records found"))),
                    rows?.length > 0 &&
                        rows.map((row) => (react_1.default.createElement(Row, { key: row?.employeeName,
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
                            stickyLeft }))))))),
        react_1.default.createElement(material_1.TablePagination, { page: tablePagination.pageNo, rowsPerPage: tablePagination.perPage, rowsPerPageOptions: [10, 20, 50], count: totalcount || 0, component: material_1.Paper, elevation: 0, onPageChange: (_event, newPage) => {
                onPageChange(newPage);
            }, onRowsPerPageChange: (_event) => {
                onRowsPerPageChange(parseInt(_event.target.value));
            } })));
};
exports.default = StickyTable;
