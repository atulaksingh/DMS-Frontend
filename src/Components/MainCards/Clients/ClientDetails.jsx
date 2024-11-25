import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Owner from "./OwnerDetails/Owner";
import { useParams } from "react-router-dom";
import axios from "axios";
import Bank from "./BankDetails/Bank";
import Branch from "./BranchDetails/Branch";
import ClientUser from "./ClientUser/ClientUser";

import CompanyDocuments from "./CompanyDocuments/CompanyDocuments";
import CV from "./CorV/CV";
import Pf from "../PF/Pf";
import Documents from "../Documents/Documents";
import Sales from "./Sales/Sales";
function ClientDetails() {
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const [clientData, setClientData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [clientUserData, setClientUserData] = useState(null);
  const [companyDocData, setCompanyDocData] = useState(null);
  const [CVData, setCVData] = useState(null);
  const [PfData, setPfData] = useState(null);
  const [taxAuditData, setTaxAuditData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [sftData, setSftData] = useState(null);
  const [tdsReturnData, setTdsReturnData] = useState(null);
  const [tdsPaymentData, setTdsPaymentData] = useState(null);
  const [salesInvoiceData, setSalesInvoiceData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/detail-client/${id}`
        );
        console.log("cleee0", response.data);
        setClientData(response.data.Client);
        setOwnerData(response.data.Owner);
        setBankData(response.data.Bank);
        setBranchData(response.data.Branch);
        setClientUserData(response.data.ClientUser);
        setCompanyDocData(response.data.Company_Document);
        setCVData(response.data.Customer_or_Vendor);
        setPfData(response.data.PF);
        setTaxAuditData(response.data.Tax_Audit);
        setAirData(response.data.AIR);
        setSftData(response.data.SFT);
        setTdsReturnData(response.data.TDS_Return);
        setTdsPaymentData(response.data.TDS_Payment);
        setSalesInvoiceData(response.data.sales_invoice);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading client details: {error.message}</div>;
  }
  return (
    <>
      <div className="pt-20 px-32 ">
        <div className="bg-secondary  px-6 py-5 rounded-md shadow-lg">
          <div className="text-xl font-bold ">ClientDetails</div>
          <div className="py-3 mx-2">
            {clientData && (
              <>
                <div className="grid grid-cols-3 gap-5  py-3 ">
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" text-gray-700 font-[550] ">
                      <div>Client Name :</div>
                    </div>
                    <div className="text-gray-600  ">
                      {clientData?.client_name}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Entity Type :</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {clientData?.entity_type}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Date of Incorporation :</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {clientData.date_of_incorporation}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5  py-3 ">
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" text-gray-700 font-[550] ">
                      <div>Contact Person :</div>
                    </div>
                    <div className="text-gray-600 subpixel-antialiased ">
                      {clientData.contact_person}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Designation :</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {clientData.designation}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Contact No :</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {clientData.contact_no_1}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5  py-3 ">
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" text-gray-700 font-[550] ">
                      <div>Another No :</div>
                    </div>
                    <div className="text-gray-600 subpixel-antialiased ">
                      {clientData.contact_no_2}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Business Details :</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {clientData.business_detail}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Status :</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {clientData.status}
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-3 gap-5  py-3 ">
                  <div className="col-span-1  ">
                    <div className="grid grid-cols-2 ">
                      <div className=" text-gray-700 font-[550] ">
                        <div>Client Name :</div>
                      </div>
                      <div className="text-gray-600  ">
                        {clientData?.client_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" font-semibold text-gray-700">
                        <div>Entity Type :</div>
                      </div>
                      <div className=" text-gray-700 font-medium subpixel-antialiased ">
                        {clientData?.entity_type}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" font-semibold text-gray-700">
                        <div>Date of Incorporation :</div>
                      </div>
                      <div className=" text-gray-700 font-medium subpixel-antialiased ">
                        {clientData.date_of_incorporation}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" text-gray-700 font-[550] ">
                        <div>Contact Person :</div>
                      </div>
                      <div className="text-gray-600 subpixel-antialiased ">
                        {clientData.contact_person}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" font-semibold text-gray-700">
                        <div>Designation :</div>
                      </div>
                      <div className=" text-gray-700 font-medium subpixel-antialiased ">
                        {clientData.designation}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" font-semibold text-gray-700">
                        <div>Contact No :</div>
                      </div>
                      <div className=" text-gray-700 font-medium subpixel-antialiased ">
                        {clientData.contact_no_1}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" text-gray-700 font-[550] ">
                        <div>Another No :</div>
                      </div>
                      <div className="text-gray-600 subpixel-antialiased ">
                        {clientData.contact_no_2}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" font-semibold text-gray-700">
                        <div>Business Details :</div>
                      </div>
                      <div className=" text-gray-700 font-medium subpixel-antialiased ">
                        {clientData.business_detail}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="grid grid-cols-2">
                      <div className=" font-semibold text-gray-700">
                        <div>Status :</div>
                      </div>
                      <div className=" text-gray-700 font-medium subpixel-antialiased ">
                        {clientData.status}
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
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
                        color: "primary", // Color of the selected tab text
                        fontWeight: "bold",
                        border: 2,
                      },
                      "&:hover": {
                        color: "primary", // Color when hovering over the tab
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
                </TabList>
              </Box>
              <TabPanel value="1">
                <Owner ownerData={ownerData} />
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
                {/* <Pf /> */}
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
                
              </TabPanel>
              <TabPanel value="9">
                <Sales salesInvoiceData={salesInvoiceData}/>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ClientDetails;
