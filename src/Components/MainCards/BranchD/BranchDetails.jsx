import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import BranchDoc from "./BranchDoc/BranchDoc";
import OfficeLoc from "./OfficeLoc/OfficeLoc";
import { HomeIcon } from "@heroicons/react/16/solid";

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
  const fetchBranchDetails = async () => {
    try {
      const response = await axios.get(
        `https://admin.dms.zacoinfotech.com/api/detail-branch/${clientID}/${branchID}`
      );
      // console.log("branch------------->", response.data);
      setBranchData(response.data.Branch);
      setOfficeLocationData(response.data.Office_Location);
      setBranchDocumentsData(response.data.Branch_Document);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBranchDetails();
  }, [clientID, branchID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading client details: {error.message}</div>;
  }

  const location = useLocation(); // Get the current location object
  const pathnames = location.pathname
  .split("/")
  .filter((x) => x && isNaN(Number(x))); // Exclude numeric segments like IDs

// Construct breadcrumb items
const breadcrumbItems = [
  { name: "Home", path: "/master" }, // Hardcoded Home breadcrumb
  ...pathnames.map((segment, index) => {
    // Generate breadcrumb path
    let path = `/${pathnames.slice(0, index + 1).join("/")}`;
    if (segment.toLowerCase() === "clientdetails") {
      // Append clientID to the path if the segment is 'ClientDetails'
      path = `/clientDetails/${clientID}`;
    }
    return { name: segment.charAt(0).toUpperCase() + segment.slice(1), path };
  }),
];
  return (
    <>
      {console.log("clientid", clientID)}
      <div className="pt-20 px-32 ">
        <div>
        <nav className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md w-fit mb-1">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index === 0 ? (
            // "Home" breadcrumb link
            <Link
              to={item.path}
              className="flex items-center text-primary hover:text-primary"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="ml-1">{item.name}</span>
            </Link>
          ) : (
            // Other breadcrumb links
            <Link
              to={item.path}
              className="text-gray-700 hover:text-primary"
            >
              {item.name}
            </Link>
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
                </div>
                <div className=" flex gap-x-4 justify-start">
                  <div className=" font-semibold text-gray-700">
                    <div>Address:</div>
                  </div>
                  <div className=" text-gray-700 font-medium subpixel-antialiased ">
                    {branchData.address}
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
                <BranchDoc
                  branchDocumentsData={branchDocumentsData}
                  fetchBranchDetails={fetchBranchDetails}
                />
              </TabPanel>
              <TabPanel value="2">
                {/* <Bank bankData={bankData} /> */}
                <OfficeLoc
                  officeLocationData={officeLocationData}
                  fetchBranchDetails={fetchBranchDetails}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default BranchDetails;
