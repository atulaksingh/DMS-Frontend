import React, { useState, useEffect } from "react";
import { Typography, Menu, MenuItem, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "../../Card";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const tableData = [
  {
    name: "John Doe",
    share: 50,
    pan: "ABCDE1234F",
    aadhar: "1234-5678-9012",
    mobile: 9876543210,
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    share: 30,
    pan: "WXYZ5678A",
    aadhar: "1111-2222-3333",
    mobile: 9123456789,
    email: "jane.smith@example.com",
  },
  {
    name: "John Doe",
    share: 50,
    pan: "ABCDE1234F",
    aadhar: "1234-5678-9012",
    mobile: 9876543210,
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    share: 30,
    pan: "WXYZ5678A",
    aadhar: "1111-2222-3333",
    mobile: 9123456789,
    email: "jane.smith@example.com",
  },
  {
    name: "John Doe",
    share: 50,
    pan: "ABCDE1234F",
    aadhar: "1234-5678-9012",
    mobile: 9876543210,
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    share: 30,
    pan: "WXYZ5678A",
    aadhar: "1111-2222-3333",
    mobile: 9123456789,
    email: "jane.smith@example.com",
  },
  {
    name: "Michael Johnson",
    share: 20,
    pan: "JKL9876Z",
    aadhar: "4444-5555-6666",
    mobile: 9876123456,
    email: "michael.johnson@example.com",
  },
  {
    name: "Emily Davis",
    share: 40,
    pan: "QWER3456D",
    aadhar: "7777-8888-9999",
    mobile: 9988776655,
    email: "emily.davis@example.com",
  },
  {
    name: "Chris Lee",
    share: 60,
    pan: "PLMN1357X",
    aadhar: "1010-2020-3030",
    mobile: 9090909090,
    email: "chris.lee@example.com",
  },
  {
    name: "David Brown",
    share: 25,
    pan: "GHJK2468P",
    aadhar: "4040-5050-6060",
    mobile: 8989898989,
    email: "david.brown@example.com",
  },

  {
    name: "Sophia Wilson",
    share: 55,
    pan: "MNBV6789Q",
    aadhar: "7070-8080-9090",
    mobile: 9191919191,
    email: "sophia.wilson@example.com",
  },
  {
    name: "William Taylor",
    share: 35,
    pan: "HJKL9876V",
    aadhar: "3030-4040-5050",
    mobile: 7070707070,
    email: "william.taylor@example.com",
  },
  // Add more rows as needed
];

function Owner() {
  // Dynamically set the table body height
  const calculateTableBodyHeight = () => {
    const rowHeight = 50; // Approximate height for one row
    const maxHeight = 525; // Maximum table body height
    const calculatedHeight = tableData.length * rowHeight;
    return calculatedHeight > maxHeight
      ? `${maxHeight}px`
      : `${calculatedHeight}px`;
  };

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState(
    calculateTableBodyHeight
  );
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  // Recalculate height when tableData changes
  useEffect(() => {
    setTableBodyHeight(calculateTableBodyHeight());
  }, [tableData]);

  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(rowData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    console.log("Update:", currentRow);
    handleClose();
  };

  const handleDelete = () => {
    console.log("Delete:", currentRow);
    handleClose();
  };
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    {
      name: "share",
      label: "Share",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    {
      name: "pan",
      label: "PAN",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    {
      name: "aadhar",
      label: "Aadhar",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    {
      name: "Actions",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = tableData[dataIndex];
          return (
            <div>
              <Card />
            </div>
          );
        },
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    selectableRows: "none",
    rowsPerPage: 13,
    rowsPerPageOptions: [13, 25, 50, 100],
    page: 0,
  };

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: "#366FA1",
            paddingBlock: "2px",
            color: "#ffffff !important",
            "&.MuiTableSortLabel-root": {
              color: "#ffffff !important",
              "&:hover": {
                color: "#ffffff !important",
              },
              "&.Mui-active": {
                color: "#ffffff !important",
                "& .MuiTableSortLabel-icon": {
                  color: "#ffffff !important",
                },
              },
            },
          },
          body: {
            paddingBlock: "0px",
          },
        },
      },
    },
  });

  return (
    <>
      <div>
        <div className="flex justify-between align-middle items-center mb-5">
          <div className="text-2xl text-gray-800 font-semibold">
            Owner Details
          </div>
          <div>
            <Link to={"/client"}>
              <Button size="md" className="bg-[#366FA1] hover:bg-[#2d5e85]">
                Create
              </Button>
            </Link>
          </div>
        </div>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={theme}>
            <MUIDataTable
              data={tableData}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </CacheProvider>
      </div>
    </>
  );
}

export default Owner;
