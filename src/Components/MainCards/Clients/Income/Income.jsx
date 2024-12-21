



import React, { useState, useEffect } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Input, Typography } from "@material-tailwind/react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ImFilePicture } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useParams } from "react-router-dom";

import IncomeFileCreation from "./IncomeFileCreation";
import IncomeCreation from "./IncomeCreation";
import IncomeCard from "./IncomeCard";


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const styleCreateMOdal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
function Income({incomeInvoiceData}) {
  const calculateTableBodyHeight = () => {
    const rowHeight = 80; 
    const maxHeight = 525; 
    const calculatedHeight = incomeInvoiceData.length * rowHeight;
    return calculatedHeight > maxHeight
      ? `${maxHeight}px`
      : `${calculatedHeight}px`;
  };
  const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(() => {
    setTableBodyHeight(calculateTableBodyHeight());
  }, [incomeInvoiceData]);

  const columns = [
    {
      name: "id",
      label: "Sr No",
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
      name: "attach_e_way_bill",
      label: "Attachments",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
        customBodyRender: (value) => (
          value ? (
            <a href={`http://127.0.0.1:8000${value}`} target="_blank" rel="noopener noreferrer">
              <ImFilePicture size={20} color="#366FA1" />
            </a>
          ) : null
        ),
      },
    },
    {
      name: "invoice_no",
      label: "Invoice Number",
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
      name: "invoice_type",
      label: "Invoice Type",
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
      name: "invoice_date",
      label: "Invoice Date",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#366FA1",
            color: "#ffffff",
          },
        }),
      },
    },
    // {
    //   name: "ifsc",
    //   label: "IFSC Code",
    //   options: {
    //     setCellHeaderProps: () => ({
    //       style: {
    //         backgroundColor: "#366FA1",
    //         color: "#ffffff",
    //       },
    //     }),
    //   },
    // },
    // {
    //   name: "branch",
    //   label: "Branch",
    //   options: {
    //     setCellHeaderProps: () => ({
    //       style: {
    //         backgroundColor: "#366FA1",
    //         color: "#ffffff",
    //       },
    //     }),
    //   },
    // },
    {
      name: "attachment",
      label: "Document",
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
          const rowData = incomeInvoiceData[dataIndex];
          return <div>{/* <BankCard rowId={rowData.id} /> */} 
          {/* <PurchaseCard rowId={rowData.id} fileData={purchaseInvoiceData.attach_e_way_bill}/>  */}
          <IncomeCard rowId={rowData.id} fileData={incomeInvoiceData.attach_e_way_bill} />
          </div>;
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
      // console.log(action);
      // console.dir(state);
    },
    selectableRows: "none",
    selectableRowsHeader: false,
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
      <ToastContainer />

      <div>
        <div className="flex justify-between align-middle items-center mb-5">
          <div className="text-2xl text-gray-800 font-semibold">
            Income Details
          </div>
      
          <div className="flex align-middle items-center gap-2">
          
           
            <IncomeFileCreation />
            <IncomeCreation />
          </div>
        </div>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={theme}>
            <MUIDataTable data={incomeInvoiceData} columns={columns} options={options} />
          </ThemeProvider>
        </CacheProvider>
      </div>
    </>
  );
}

export default Income;

