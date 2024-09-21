import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
function ClientDetails() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="pt-20 px-32 ">
        <div className="bg-secondary  px-6 py-10 rounded-md shadow-lg">
          <div className="text-xl font-bold ">ClientDetails</div>

          <div className="grid grid-cols-4  py-4 border-b border-gray-400">
            <div className="col-span-1 font-semibold text-gray-700">
              <div>Company Name</div>
            </div>
            <div className="col-span-3 text-gray-700 font-medium subpixel-antialiased ">
              AD Factor Priavte ltd
            </div>
          </div>
          <div className="grid grid-cols-4  py-4 border-b border-gray-400">
            <div className="col-span-1 font-semibold text-gray-700">
              <div>Company Name</div>
            </div>
            <div className="col-span-3 text-gray-700 font-medium subpixel-antialiased ">
              AD Factor Priavte ltd
            </div>
          </div>
          <div className="grid grid-cols-4  py-4 border-b border-gray-400">
            <div className="col-span-1 font-semibold text-gray-700">
              <div>Company Name</div>
            </div>
            <div className="col-span-3 text-gray-700 font-medium subpixel-antialiased ">
              AD Factor Priavte ltd
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="py-10 px-32">
      <div className="bg-secondary px-6 py-2 rounded-md shadow-lg">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="customized tabs example"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: 'primary', // Custom color for the tab indicator
                  },
                }}
              >
                <Tab
                  label="Item One"
                  value="1"
                  sx={{
                    '&.Mui-selected': {
                      color: 'primary', // Color of the selected tab text
                      fontWeight: 'bold',
                    },
                    '&:hover': {
                      color: 'primary', // Color when hovering over the tab
                    },
                  }}
                />
                <Tab
                  label="Item Two"
                  value="2"
                  sx={{
                    '&.Mui-selected': {
                      color: 'primary',
                      fontWeight: 'bold',
                    },
                    '&:hover': {
                      color: 'primary',
                    },
                  }}
                />
                <Tab
                  label="Item Three"
                  value="3"
                  fontWeight="bold"
                  sx={{
                    '&.Mui-selected': {
                      color: 'primary',
                      fontWeight: 'bold',
                    },
                    '&:hover': {
                      color: 'primary',
                    },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
    </>
  );
}

export default ClientDetails;
