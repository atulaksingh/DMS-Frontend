import React, { useState } from "react";
import {  Typography, Menu, MenuItem, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "./card";
import { Button } from "@material-tailwind/react";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const tableData = [
  {
    name: "Adeel Solangi",
    language: "Sindhi",
    id: "V59OF92YF627HFY0",
    number: "+1234567890",
    mailid: "adeel.solangi@example.com",
    version: 6.1,
  },
  {
    name: "Afzal Ghaffar",
    language: "Sindhi",
    id: "ENTOCR13RSCLZ6KU",
    number: "+0987654321",
    mailid: "afzal.ghaffar@example.com",
    version: 1.88,
  },
  {
    name: "Aamir Solangi",
    language: "Sindhi",
    id: "IAKPO3R4761JDRVG",
    number: "+1122334455",
    mailid: "aamir.solangi@example.com",
    version: 7.27,
  },
  {
    name: "Abla Dilmurat",
    language: "Uyghur",
    id: "5ZVOEPMJUI4MB4EN",
    number: "+5566778899",
    mailid: "abla.dilmurat@example.com",
    version: 2.53,
  },
  {
    name: "Adil Eli",
    language: "Uyghur",
    id: "6VTI8X6LL0MMPJCC",
    number: "12354678",
    mailid: "adil.eli@example.com",
    version: 6.49,
  },
  {
    name: "Adile Qadir",
    language: "Uyghur",
    id: "F2KEU5L7EHYSYFTT",
    number: "+6789012345",
    mailid: "adile.qadir@example.com",
    version: 5.12,
  },
  {
    name: "Abdukerim Ibrahim",
    language: "Uyghur",
    id: "LO6DVTZLRK68528I",
    number: "+7890123456",
    mailid: "abdukerim.ibrahim@example.com",
    version: 4.45,
  },
  {
    name: "Adil Abro",
    language: "Sindhi",
    id: "LJRIULRNJFCNZJAJ",
    number: "+8901234567",
    mailid: "adil.abro@example.com",
    version: 8.34,
  },
  {
    name: "Ayesha Siddiqi",
    language: "Sindhi",
    id: "Y56JOP12NB34LMNO",
    number: "+2345678901",
    mailid: "ayesha.siddiqi@example.com",
    version: 2.79,
  },
  {
    name: "Khalid Ahmed",
    language: "Sindhi",
    id: "Z89QRS56TYU90OPQ",
    number: "+3456789012",
    mailid: "khalid.ahmed@example.com",
    version: 9.22,
  },
  {
    name: "Fatima Noor",
    language: "Sindhi",
    id: "H12JKL34MN56OPQR",
    number: "+4567890123",
    mailid: "fatima.noor@example.com",
    version: 3.67,
  },
  {
    name: "Ali Raza",
    language: "Sindhi",
    id: "G23VWX45YZ67ABCD",
    number: "+5678901234",
    mailid: "ali.raza@example.com",
    version: 4.12,
  },
  {
    name: "Hassan Javed",
    language: "Uyghur",
    id: "I34CDE56FG78HIJK",
    number: "+6789012345",
    mailid: "hassan.javed@example.com",
    version: 6.89,
  },
  {
    name: "Sara Khan",
    language: "Uyghur",
    id: "J45EFG67GH89JKLM",
    number: "+7890123456",
    mailid: "sara.khan@example.com",
    version: 5.53,
  },
  {
    name: "Omer Ahmed",
    language: "Uyghur",
    id: "K56FGH78IJ90NOPQ",
    number: "+8901234567",
    mailid: "omer.ahmed@example.com",
    version: 7.92,
  },
  {
    name: "Maya Farooq",
    language: "Uyghur",
    id: "L67HIJ89KL01OPQR",
    number: "+9012345678",
    mailid: "maya.farooq@example.com",
    version: 4.76,
  },
  {
    name: "Naveed Akhtar",
    language: "Sindhi",
    id: "M78JKL90MN12PQRS",
    number: "+0123456789",
    mailid: "naveed.akhtar@example.com",
    version: 3.44,
  },
  {
    name: "Sana Malik",
    language: "Sindhi",
    id: "N89KLM01NO23QRST",
    number: "+1234567890",
    mailid: "sana.malik@example.com",
    version: 8.11,
  },
  {
    name: "Imran Sheikh",
    language: "Sindhi",
    id: "O90LMN12OP34QRST",
    number: "+2345678901",
    mailid: "imran.sheikh@example.com",
    version: 2.94,
  },
  {
    name: "Rana Aslam",
    language: "Uyghur",
    id: "P01NOP23QR45STUV",
    number: "+3456789012",
    mailid: "rana.aslam@example.com",
    version: 5.29,
  },
  {
    name: "Zainab Abbas",
    language: "Uyghur",
    id: "Q12OPQ34RS56TUVW",
    number: "+4567890123",
    mailid: "zainab.abbas@example.com",
    version: 7.66,
  },
  {
    name: "Faisal Khan",
    language: "Sindhi",
    id: "R23PQR45ST67UVWX",
    number: "+5678901234",
    mailid: "faisal.khan@example.com",
    version: 6.88,
  },
];

function MuiTable() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("550px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

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
      name: "language",
      label: "Language",
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
      name: "id",
      label: "ID",
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
      name: "number",
      label: "Number",
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
      name: "mailid",
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
      name: "version",
      label: "Version",
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
              {/* <IconButton onClick={(e) => handleClick(e, rowData)}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu> */}
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
  };

  const theme = createTheme({
    components: {
      // Override MUI DataTable header styles
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: "#366FA1", // Header background color
            paddingBlock: "2px",
            color: "#ffffff !important", // Force white text color even after sorting
            "&.MuiTableSortLabel-root": {
              color: "#ffffff !important", // Sorting color override
              "&:hover": {
                color: "#ffffff !important",
              },
              "&.Mui-active": {
                color: "#ffffff !important",
                "& .MuiTableSortLabel-icon": {
                  color: "#ffffff !important", // Sorting icon color override
                },
              },
            },
          },
          body: {
            paddingBlock: "0px", // Padding for body cells
          },
        },
      },
    },
  });

  return (
    <>
                                      
      <div style={{ padding: "48px 80px" }}>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={"Client Details"}
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

export default MuiTable;
