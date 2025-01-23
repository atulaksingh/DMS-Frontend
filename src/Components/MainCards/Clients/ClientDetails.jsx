import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Owner from "./OwnerDetails/Owner";
import Bank from "./BankDetails/Bank";
import Branch from "./BranchDetails/Branch";
import ClientUser from "./ClientUser/ClientUser";
import CompanyDocuments from "./CompanyDocuments/CompanyDocuments";
import CV from "./CorV/CV";
import Documents from "../Documents/Documents";
import Purchase from "./Purchase/Purchase";
import Sales from "./Sales/Sales";
import { fetchClientDetails } from "../../Redux/clientSlice";
import Income from "./Income/Income";
import Expenses from "./Expenses/Expenses";
import ZipFile from "./ZipFile/ZipFile";
import { HomeIcon } from "@heroicons/react/16/solid";
function ClientDetails() {
  // const id = 1;
  const { id } = useParams();
  const [value, setValue] = React.useState("1");

  const [loading, setLoading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  // Select data from Redux store
  const {
    clientData,
    ownerData,
    bankData,
    branchData,
    clientUserData,
    companyDocData,
    CVData,
    PfData,
    taxAuditData,
    airData,
    sftData,
    tdsReturnData,
    tdsPaymentData,
    salesInvoiceData,
    purchaseInvoiceData,
    incomeInvoiceData,
    expensesInvoiceData,
    zipFileData,
    status,
    error,
  } = useSelector((state) => state.client);

  // Fetch data on component mount
  useEffect(() => {
    // console.log(id)
    dispatch(fetchClientDetails(id));
  }, [id, dispatch]);

  //   if (status === "loading") {
  //     return <div>Loading...</div>;
  //   }

  //   if (status === "failed") {
  //     return <div>Error: {error}</div>;
  //   }

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error loading client details: {error.message}</div>;
  //   }
  const location = useLocation(); // Get the current location object
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && isNaN(Number(x))); // Split the URL into path segments

  const breadcrumbItems = [
    { name: "Home", path: "/master" }, // Hardcoded Home breadcrumb
    ...pathnames.map((segment, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      return { name: segment.charAt(0).toUpperCase() + segment.slice(1), path };
    }),
  ];
  return (
    <>
      <div className="pt-20 px-32 ">
        <div>
          <nav className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md w-fit mb-1">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                {index === 0 ? (
                  // Home link
                  <Link
                    to={item.path}
                    className="flex items-center text-primary hover:text-primary"
                  >
                    <HomeIcon className="h-5 w-5" />
                    <span className="ml-1">{item.name}</span>
                  </Link>
                ) : (
                  // Conditional for other breadcrumb links
                  <button
                    onClick={() =>
                      item.name === "Clientdetails"
                        ? navigate(-1)
                        : navigate(item.path)
                    }
                    className="text-gray-700 hover:text-primary"
                  >
                    {item.name}
                  </button>
                )}
                {/* Arrow icon between breadcrumbs */}
                {index < breadcrumbItems.length - 1 && (
                  <span className="text-gray-400">{">"}</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="bg-secondary  px-6 py-5 rounded-md shadow-lg">
          <div className="text-xl font-bold ">ClientDetails</div>
          <div className="py-3 mx-2">
            {clientData?.id ? (
              <>
                <div className="grid grid-cols-12 py-3">
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Client Name:{" "}
                  </div>
                  <div className="grid col-span-3 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.client_name}
                  </div>
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Entity Type:{" "}
                  </div>
                  <div className="grid col-span-3 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.entity_type}
                  </div>
                  <div className="grid col-span-2 text-gray-700 font-[550]">
                    Date of Incorporation:
                  </div>
                  <div className="grid col-span-1 text-gray-700 font-medium subpixel-antialiased text-left">
                    {clientData.date_of_incorporation}
                  </div>
                </div>
                <div className="grid grid-cols-12 py-3">
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Contact Person:{" "}
                  </div>
                  <div className="grid col-span-3 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.contact_person}
                  </div>
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Designation:{" "}
                  </div>
                  <div className="grid col-span-3 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.designation}
                  </div>
                  <div className="grid col-span-2 text-gray-700 font-[550]">
                    Contact No:
                  </div>
                  <div className="grid col-span-1 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.contact_no_1}
                  </div>
                </div>
                <div className="grid grid-cols-12 py-3">
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Another No:{" "}
                  </div>
                  <div className="grid col-span-3 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.contact_no_2}
                  </div>
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Status :{" "}
                  </div>
                  <div className="grid col-span-3 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.status}
                  </div>
                </div>
                <div className="grid grid-cols-10 py-3">
                  <div className="grid col-span-1 text-gray-700 font-[550]">
                    Business Details:{" "}
                  </div>
                  <div className="grid col-span-9 text-gray-700 font-medium subpixel-antialiased">
                    {clientData.business_detail}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-700 font-medium text-center py-6">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-10 px-32">
        <div className="bg-secondary px-6 py-3 rounded-md shadow-lg">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: "primary",
                    },
                  }}
                >
                  <Tab
                    label="Owner Details"
                    value="1"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Bank Details"
                    value="2"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Branch Details"
                    value="3"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Client Users"
                    value="4"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Company Documents"
                    value="5"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Customer Vendor"
                    value="6"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Documents"
                    value="7"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Purchase"
                    value="8"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Sales"
                    value="9"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Income"
                    value="10"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="Expenses"
                    value="11"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                  <Tab
                    label="ZipFile  Upload"
                    value="12"
                    fontWeight="bold"
                    sx={{
                      "&.Mui-selected": {
                        color: "primary",
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary",
                      },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                {ownerData ? (
                  <Owner ownerData={ownerData} />
                ) : (
                  <div>No owner data available</div>
                )}
              </TabPanel>
              <TabPanel value="2">
                <Bank bankData={bankData} />
              </TabPanel>
              <TabPanel value="3">
                <Branch branchData={branchData} />
              </TabPanel>
              <TabPanel value="4">
                <ClientUser clientUserData={clientUserData} />
              </TabPanel>
              <TabPanel value="5">
                <CompanyDocuments companyDocData={companyDocData} />
              </TabPanel>
              <TabPanel value="6">
                <CV cvData={CVData} />
              </TabPanel>
              <TabPanel value="7">
                <Documents
                  PfData={PfData}
                  taxAuditData={taxAuditData}
                  airData={airData}
                  sftData={sftData}
                  tdsReturnData={tdsReturnData}
                  tdsPaymentData={tdsPaymentData}
                />
              </TabPanel>
              <TabPanel value="8">
                <Purchase purchaseInvoiceData={purchaseInvoiceData} />
              </TabPanel>
              <TabPanel value="9">
                <Sales salesInvoiceData={salesInvoiceData} />
              </TabPanel>
              <TabPanel value="10">
                <Income incomeInvoiceData={incomeInvoiceData} />
                {/* <Sales salesInvoiceData={salesInvoiceData}/> */}
              </TabPanel>
              <TabPanel value="11">
                <Expenses expensesInvoiceData={expensesInvoiceData} />
              </TabPanel>
              <TabPanel value="12">
                <ZipFile zipFileData={zipFileData} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ClientDetails;
