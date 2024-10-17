import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import axios from "axios";
import BranchDoc from "./BranchDoc/BranchDoc";
import OfficeLoc from "./OfficeLoc/OfficeLoc";

function BranchDetails() {
  const { clientID, branchID } = useParams();
  //   console.log("useee",useParams())
  const [value, setValue] = React.useState("1");
  const [branchData, setBranchData] = useState(null);
  const [officeLocationData, setOfficeLocationData] = useState(null);
  const [branchDocumentsData, setBranchDocumentsData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/detail-branch/${clientID}/${branchID}`
        );
        console.log("branch------------->", response.data);
        setBranchData(response.data.Branch);
        setOfficeLocationData(response.data.Office_Location);
        setBranchDocumentsData(response.data.Branch_Document);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBranchDetails();
  }, [clientID, branchID]);

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
            {branchData && (
              <>
                <div className="grid grid-cols-3 gap-5  py-3 ">
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" text-gray-700 font-[550] ">
                      <div>Branch Name:</div>
                    </div>
                    <div className="text-gray-600  ">
                      {branchData?.branch_name}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Gst NO:</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {branchData?.gst_no}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Contact:</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {branchData.contact}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5  py-3 ">
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" text-gray-700 font-[550] ">
                      <div>State:</div>
                    </div>
                    <div className="text-gray-600 subpixel-antialiased ">
                      {branchData.state}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>City:</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {branchData.city}
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-x-4 justify-start">
                    <div className=" font-semibold text-gray-700">
                      <div>Address:</div>
                    </div>
                    <div className=" text-gray-700 font-medium subpixel-antialiased ">
                      {branchData.address}
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-3 gap-5  py-3 ">
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
                </div> */}

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
                  aria-label="customized tabs example"
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: "primary",
                    },
                  }}
                >
                  <Tab
                    label="Branch Documents"
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
                    label="Office Location"
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
                </TabList>
              </Box>
              <TabPanel value="1">
         
                <BranchDoc branchDocumentsData={branchDocumentsData}/>
              </TabPanel>
              <TabPanel value="2">
                {/* <Bank bankData={bankData} /> */}
                <OfficeLoc officeLocationData={officeLocationData}/>
              </TabPanel>
           
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default BranchDetails;
