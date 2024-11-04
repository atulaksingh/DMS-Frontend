import {
  Button,
  Checkbox,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect } from "react";
const styleCreateMOdal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
function SalesCreation() {
  const { id } = useParams();
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [offData, setOffData] = useState([]);
  const [value, setValue] = React.useState("1");
  const [customerData, setCustomerData] = useState([]);
  const [product_ser_Data, setProduct_ser_Data] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleCreateOpen = () => {
    setOpenCreateModal(true);
    setAnchorEl(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreateClose = () => setOpenCreateModal(false);
  const [formData, setFormData] = useState({
    location: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    country: "",
    gst_no: "",
    name: "",
    pan: "",
    customer_address: "",
    customer: false,
    vendor: false,
    hsnCode: "",
    gst_rate: "",
  });
  const [rows, setRows] = useState([
    {
      product: "",
      hsnCode: "",
      gstRate: "",
      description: "",
      unit: "",
    },
  ]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [selectedLocation, setSelectedLocation] = useState("");
  const [productID, setProductID] = useState("");
  const [selectedGstNo, setSelectedGstNo] = useState("");
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/create-sales/${id}`
        );
        // console.log("ggggggg->", response.data);
        setOffData(response.data.serializer);
        setCustomerData(response.data.serializer_customer);
        setProduct_ser_Data(response.data.product_serializer);
      } catch (error) {}
    };
    fetchBankDetails();
  }, [id]);

  const handleLocationChange11111 = async () => {
    try {
      console.log(productID, "kkkk1111");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/create-sales/${id}/?newValue=${selectedLocation}&productID=${productID}`
      );

      console.log("Product ID1111:", response);

      // Update only the location-related fields in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: response.data.location?.location || "", // Update location
        contact: response.data.location?.contact || prevFormData.contact, // Preserve contact if not provided
        address: response.data.location?.address || prevFormData.address, // Preserve address if not provided
        city: response.data.location?.city || prevFormData.city, // Preserve city if not provided
        state: response.data.location?.state || prevFormData.state, // Preserve state if not provided
        country: response.data.location?.country || prevFormData.country, // Preserve country if not provided
        // hsnCode: response.data.hsn?.hsn_code || "", // Preserve country if not provided
        // gst_rate: response.data.hsn?.gst_rate || "", // Preserve country if not provided
        // Do not overwrite gst_no, name, pan, customer, vendor unless you need to
      }));
      setRows((prevRows) =>
        prevRows.map((row, index) =>
          index === 0
            ? {
                ...row,
                hsnCode: response.data.hsn?.hsn_code || "",
                gstRate: response.data.hsn?.gst_rate || "",
              }
            : row
        )
      );
    } catch (error) {
      console.error("Error sending location id:", error);
    }
  };

  const handleGstNoChange = (event, newValue1) => {
    // If user clears the input
    if (!newValue1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        gst_no: "",
        name: "",
        pan: "",
        customer_address: "",
        customer: false,
        vendor: false,
      }));
      return;
    }

    // Handle the case when a string is typed in the Autocomplete input
    if (typeof newValue1 === "string") {
      const matchedCustomer = customerData.find(
        (customer) => customer.gst_no === newValue1
      );

      if (matchedCustomer) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          gst_no: matchedCustomer.gst_no,
          name: matchedCustomer.name,
          pan: matchedCustomer.pan,
          customer_address: matchedCustomer.address,
          customer: matchedCustomer.customer,
          vendor: matchedCustomer.vendor,
        }));
      } else {
        // If no match is found, allow custom GST number input
        setFormData((prevFormData) => ({
          ...prevFormData,
          gst_no: newValue1,
          name: "",
          pan: "",
          customer_address: "",
          customer: false,
          vendor: false,
        }));
      }
      return;
    }

    // Handle the case where an object (customer) is selected
    if (newValue1 && newValue1.gst_no) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        gst_no: newValue1.gst_no,
        name: newValue1.name || "",
        pan: newValue1.pan || "",
        customer_address: newValue1.address || "",
        customer: newValue1.customer || false,
        vendor: newValue1.vendor || false,
      }));
    }
  };

  const handleProductChange = (event, newValue, index) => {
    if (newValue) {
      setProductID(newValue.id)
      
      setRows((prevRows) =>
        prevRows.map((row, rowIndex) =>
          rowIndex === index
            ? {
                ...row,
                product: newValue.product_name || "",
                hsnCode: newValue.hsn_code || "",
                gstRate: newValue.gst_rate || "",
              }
            : row
        )
      );
    } else {
      // Clear fields if no product is selected
      setRows((prevRows) =>
        prevRows.map((row, rowIndex) =>
          rowIndex === index
            ? { ...row, product: "", hsnCode: "", gstRate: "" }
            : row
        )
      );
    }
  };
  useEffect(() => {
    if (selectedLocation || productID) {
      handleLocationChange11111();
    }
  }, [selectedLocation, productID]);
  // console.log("formddddata1111->", productID);

  console.log("djjj", rows);
  const handleInputChangeProduct = (index, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        product: "",
        hsnCode: "",
        gstRate: "",
        description: "",
        unit: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  return (
    <>
      <ToastContainer />
      <div>
        <Modal
          open={openCreateModal}
          onClose={handleCreateClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="overflow-auto"
        >
          <Box sx={styleCreateMOdal}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center border-b-2 border-[#366FA1] pb-3 overflow-auto"
            >
              Create Sales Details
            </Typography>
            <form className=" my-5 w-full h-full overflow-auto ">
              <div className="font-bold text-[15px] text-primary my-1">
                Office Location Details
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 border-r-2 border-primary">
                      <label htmlFor="account_no">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Office Location
                        </Typography>
                      </label>
                    </div>
                    <div className="col-span-8">
                      <div className="">
                        <Stack spacing={1} sx={{ width: 300 }}>
                          <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={offData}
                            getOptionLabel={(option) => option.location || ""}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                const selectedId = newValue.id;
                                setSelectedLocation(selectedId);
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  location: newValue.location || "", // Set location in formData
                                }));
                              } else {
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  location: "", // Reset location if no value is selected
                                }));
                              }
                            }}
                            renderOption={(props, option) => (
                              <li
                                {...props}
                                key={option.id}
                                style={{
                                  padding: "4px 8px",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {option.location}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                value={formData.location ?? ""} // Use nullish coalescing to ensure value is never undefined
                                className="border border-red-500"
                                placeholder="office Location"
                                sx={{
                                  // Adjust the height and padding to reduce overall size
                                  "& .MuiInputBase-root": {
                                    height: 28, // Set your desired height here
                                    padding: "4px 6px", // Adjust padding to make it smaller
                                  },
                                  "& .MuiOutlinedInput-input": {
                                    padding: "4px 6px", // Input padding
                                  },
                                }}
                                slotProps={{
                                  input: {
                                    ...params.InputProps,
                                    type: "search",
                                  },
                                }}
                              />
                            )}
                          />
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 border-r-2 border-primary">
                      <label htmlFor="contact">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold"
                        >
                          Contact
                        </Typography>
                      </label>
                    </div>
                    <div className="col-span-8">
                      {" "}
                      <div className="h-7">
                        <Input
                          type="text"
                          size="md"
                          name="contact"
                          placeholder="Contact No"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          // containerProps={{ className: "min-w-full" }}
                          style={{
                            height: "28px", // Match this to your Autocomplete's root height
                            padding: "4px 6px", // Match this padding
                            fontSize: "0.875rem", // Ensure font size is consistent
                            width: 300,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 border-r-2 border-primary">
                      <label htmlFor="address">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Address
                        </Typography>
                      </label>
                    </div>
                    <div className="col-span-8 h-7">
                      <div className="">
                        <Input
                          type="text"
                          size="md"
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          style={{
                            height: "28px", // Match this to your Autocomplete's root height
                            padding: "4px 6px", // Match this padding
                            fontSize: "0.875rem", // Ensure font size is consistent
                            width: 300,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 border-r-2 border-primary">
                      <label htmlFor="address">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          City
                        </Typography>
                      </label>
                    </div>
                    <div className="col-span-8 h-7">
                      <div className="">
                        <Input
                          type="text"
                          size="lg"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          style={{
                            height: "28px", // Match this to your Autocomplete's root height
                            padding: "4px 6px", // Match this padding
                            fontSize: "0.875rem", // Ensure font size is consistent
                            width: 300,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 border-r-2 border-primary">
                      <label htmlFor="address">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          State
                        </Typography>
                      </label>
                    </div>
                    <div className="col-span-8 h-7">
                      <div className="">
                        <Input
                          type="text"
                          size="lg"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          style={{
                            height: "28px", // Match this to your Autocomplete's root height
                            padding: "4px 6px", // Match this padding
                            fontSize: "0.875rem", // Ensure font size is consistent
                            width: 300,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-4 border-r-2 border-primary">
                      <label htmlFor="address">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Country
                        </Typography>
                      </label>
                    </div>
                    <div className="col-span-8 h-7">
                      <div className="">
                        <Input
                          type="text"
                          size="lg"
                          name="country"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          style={{
                            height: "28px", // Match this to your Autocomplete's root height
                            padding: "4px 6px", // Match this padding
                            fontSize: "0.875rem", // Ensure font size is consistent
                            width: 300,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="py-5 px-0">
                  <div className="bg-secondary px-0 py-3 rounded-md shadow-lg">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <TabContext value={value}>
                        <Box
                          sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            padding: 0,
                            margin: 0,
                            minHeight: "25px",
                          }}
                        >
                          <TabList
                            onChange={handleChange}
                            aria-label="customized tabs example"
                            TabIndicatorProps={{
                              sx: {
                                display: "none", // Hide the default tab indicator
                                padding: 0,
                                margin: 0,
                              },
                            }}
                            sx={{
                              padding: 0, // Remove any default padding from the TabList
                              minHeight: "20px", // Set a specific minHeight for the TabList
                            }}
                          >
                            <Tab
                              label="Customer And Vendor Details"
                              value="1"
                              sx={{
                                padding: "0px 10px", // Adjust padding as needed
                                minHeight: "0px", // Reduced min height
                                lineHeight: "2.2",
                                fontSize: "0.75rem",
                                "&.Mui-selected": {
                                  color: "primary.main",
                                  fontWeight: "bold",
                                  borderTop: "1px solid",
                                  borderLeft: "1px solid",
                                  borderRight: "1px solid",
                                  borderBottom: "0px",
                                  borderColor: "primary.main",
                                },
                                "&:hover": {
                                  color: "primary.main",
                                },
                              }}
                            />
                            <Tab
                              label="Product Details"
                              value="2"
                              sx={{
                                padding: "0px 10px", // Adjust padding as needed
                                minHeight: "25px", // Reduced min height
                                lineHeight: "2.2",
                                fontSize: "0.75rem",
                                "&.Mui-selected": {
                                  color: "primary.main",
                                  fontWeight: "bold",
                                  borderTop: "1px solid",
                                  borderLeft: "1px solid",
                                  borderRight: "1px solid",
                                  borderBottom: "0px",
                                  borderColor: "primary.main",
                                },
                                "&:hover": {
                                  color: "primary.main",
                                },
                              }}
                            />
                          </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ padding: "20px 0" }}>
                          <div className="grid grid-cols-2">
                            <div>
                              <div className="grid grid-cols-12 gap-2 3">
                                <div className="col-span-4 border-r-2 border-primary">
                                  <label htmlFor="account_no">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="block font-semibold mb-2"
                                    >
                                      Gst No
                                    </Typography>
                                  </label>
                                </div>
                                <div className="col-span-8">
                                  <div className="">
                                    {/* <Stack spacing={1} sx={{ width: 300 }}> */}
                                    <Autocomplete
                                      sx={{ width: 300 }}
                                      freeSolo
                                      id="gst-no-autocomplete"
                                      disableClearable
                                      options={customerData}
                                      getOptionLabel={(option) =>
                                        typeof option === "string"
                                          ? option
                                          : option.gst_no || ""
                                      }
                                      onChange={handleGstNoChange}
                                      value={formData.gst_no || ""} // Bind value to formData.gst_no
                                      renderOption={(props, option) => (
                                        <li {...props} key={option.id}>
                                          {option.gst_no}
                                        </li>
                                      )}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          name="gst_no"
                                          value={formData.gst_no || ""} // Reset input value when formData.gst_no changes
                                          onChange={(e) =>
                                            handleGstNoChange(e, e.target.value)
                                          } // Update input value on type
                                          placeholder="Enter or select GST No."
                                          sx={{
                                            // Adjust the height and padding to reduce overall size
                                            "& .MuiInputBase-root": {
                                              height: 28, // Set your desired height here
                                              padding: "4px 6px", // Adjust padding to make it smaller
                                            },
                                            "& .MuiOutlinedInput-input": {
                                              padding: "4px 6px", // Input padding
                                            },
                                          }}
                                          slotProps={{
                                            input: {
                                              ...params.InputProps,
                                              type: "search",
                                            },
                                          }}
                                        />
                                      )}
                                    />
                                    {/* </Stack> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="grid grid-cols-12 gap-2 mb-3">
                                <div className="col-span-4 border-r-2 border-primary">
                                  <label htmlFor="contact">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="block font-semibold mb-2"
                                    >
                                      Name
                                    </Typography>
                                  </label>
                                </div>
                                <div className="col-span-8">
                                  {" "}
                                  <div className="h-7">
                                    <Input
                                      type="text"
                                      size="lg"
                                      name="name"
                                      placeholder="Name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                                      labelProps={{
                                        className: "hidden",
                                      }}
                                      // containerProps={{ className: "min-w-full" }}
                                      style={{
                                        height: "28px", // Match this to your Autocomplete's root height
                                        padding: "4px 6px", // Match this padding
                                        fontSize: "0.875rem", // Ensure font size is consistent
                                        width: 300,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="grid grid-cols-12 gap-2 mb-3">
                                <div className="col-span-4 border-r-2 border-primary">
                                  <label htmlFor="address">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="block font-semibold mb-2"
                                    >
                                      PAN
                                    </Typography>
                                  </label>
                                </div>
                                <div className="col-span-8 h-7">
                                  <div className="">
                                    <Input
                                      type="text"
                                      size="lg"
                                      name="pan"
                                      placeholder="PAN No"
                                      value={formData.pan}
                                      onChange={handleInputChange}
                                      className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                                      labelProps={{
                                        className: "hidden",
                                      }}
                                      style={{
                                        height: "28px", // Match this to your Autocomplete's root height
                                        padding: "4px 6px", // Match this padding
                                        fontSize: "0.875rem", // Ensure font size is consistent
                                        width: 300,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="grid grid-cols-12 gap-2 mb-3">
                                <div className="col-span-4 border-r-2 border-primary">
                                  <label htmlFor="address">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="block font-semibold mb-2"
                                    >
                                      Customer Address
                                    </Typography>
                                  </label>
                                </div>
                                <div className="col-span-8 h-7">
                                  <div className="">
                                    <Input
                                      type="text"
                                      size="lg"
                                      name="customer_address"
                                      placeholder="Customer Address"
                                      value={formData.customer_address}
                                      onChange={handleInputChange}
                                      className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                                      labelProps={{
                                        className: "hidden",
                                      }}
                                      style={{
                                        height: "28px", // Match this to your Autocomplete's root height
                                        padding: "4px 6px", // Match this padding
                                        fontSize: "0.875rem", // Ensure font size is consistent
                                        width: 300,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="grid grid-cols-12 gap-2 mb-3 ">
                                <div className="col-span-4 border-r-2 border-primary">
                                  <label htmlFor="address">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="block font-semibold mb-2"
                                    >
                                      Customer Type
                                    </Typography>
                                  </label>
                                </div>
                                <div className="col-span-8 h-7">
                                  <div className="">
                                    <div className="">
                                      <div className="col-span-4 my-auto">
                                        <div className="flex gap-10">
                                          <Checkbox
                                            name="customer"
                                            label="Customer"
                                            ripple={false}
                                            checked={formData.customer || false}
                                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0 "
                                            onChange={(e) =>
                                              setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                customer: e.target.checked, // Update formData when Checkbox changes
                                              }))
                                            }
                                          />
                                          <Checkbox
                                            name="vendor"
                                            label="Vendor"
                                            ripple={false}
                                            checked={formData.vendor || false}
                                            onChange={(e) =>
                                              setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                vendor: e.target.checked, // Update formData when Checkbox changes
                                              }))
                                            }
                                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel value="2" sx={{ padding: "8px 0" }}>
                          <div>
                            <TableContainer
                              component={Paper}
                              className="shadow-md rounded-lg mt-3"
                            >
                              <Table>
                                <TableHead>
                                  <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                                    <TableCell
                                      className="font-semibold text-gray-600"
                                      sx={{ padding: "4px" }}
                                    >
                                      Product
                                    </TableCell>
                                    <TableCell
                                      className="font-semibold text-gray-600"
                                      sx={{ padding: "4px" }}
                                    >
                                      HSN Code
                                    </TableCell>
                                    <TableCell
                                      className="font-semibold text-gray-600"
                                      sx={{ padding: "4px" }}
                                    >
                                      GST Rate
                                    </TableCell>
                                    <TableCell
                                      className="font-semibold text-gray-600"
                                      sx={{ padding: "4px" }}
                                    >
                                      Description
                                    </TableCell>
                                    <TableCell
                                      className="font-semibold text-gray-600"
                                      sx={{ padding: "4px" }}
                                    >
                                      Unit
                                    </TableCell>
                                    <TableCell
                                      className="font-semibold text-gray-600"
                                      sx={{ padding: "4px" }}
                                    ></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
  {rows.map((row, index) => (
    <TableRow key={index} className="p-0">
      <TableCell sx={{ padding: "6px" }}>
        <Autocomplete
          freeSolo
          id={`product-autocomplete-${index}`}
          disableClearable
          options={product_ser_Data}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.product_name || ""
          }
          onChange={(event, newValue) => handleProductChange(event, newValue, index)}
          value={
            product_ser_Data.find((option) => option.product_name === row.product) || null
          }
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.product_name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Enter or select product"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "2px",
                  fontSize: "0.875rem",
                  minHeight: "30px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "4px",
                },
              }}
            />
          )}
        />
      </TableCell>
      <TableCell sx={{ padding: "6px" }}>
        <TextField
          value={row.hsnCode}
          onChange={(e) => handleInputChangeProduct(index, "hsnCode", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "2px",
              fontSize: "0.875rem",
              minHeight: "30px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px",
            },
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: "6px" }}>
        <TextField
          value={row.gstRate}
          onChange={(e) => handleInputChangeProduct(index, "gstRate", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "2px",
              fontSize: "0.875rem",
              minHeight: "30px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px",
            },
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: "6px" }}>
        <TextField
          value={row.description}
          onChange={(e) => handleInputChangeProduct(index, "description", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "2px",
              fontSize: "0.875rem",
              minHeight: "30px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px",
            },
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: "6px" }}>
        <TextField
          value={row.unit}
          onChange={(e) => handleInputChangeProduct(index, "unit", e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "2px",
              fontSize: "0.875rem",
              minHeight: "30px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px",
            },
          }}
        />
      </TableCell>
      <TableCell sx={{ padding: "6px" }}>
        <IconButton size="small" onClick={() => handleDeleteRow(index)} aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
  <TableRow>
    <TableCell colSpan={8} className="text-blue-500 space-x-5 text-sm">
      <button onClick={handleAddRow} type="button" className="hover:underline">
        Add a line
      </button>
    </TableCell>
  </TableRow>
</TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </div>
                </div>

                {/* <div className="font-bold text-[15px] text-primary my-1">
                  Office Location Details
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <label htmlFor="account_no">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Office Location
                      </Typography>
                    </label>

                    <div className="">
                      <Stack spacing={1} sx={{ width: 300 }}>
                        <Autocomplete
                          freeSolo
                          id="free-solo-2-demo"
                          disableClearable
                          options={offData}
                          getOptionLabel={(option) => option.location || ""}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              const selectedId = newValue.id;
                              setSelectedLocation(selectedId);
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                location: newValue.location || "", // Set location in formData
                              }));
                            } else {
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                location: "", // Reset location if no value is selected
                              }));
                            }
                          }}
                          renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                              {option.location}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              value={formData.location ?? ""} // Use nullish coalescing to ensure value is never undefined
                              className="border border-red-500"
                              placeholder="office Location"
                              sx={{
                                // Adjust the height and padding to reduce overall size
                                "& .MuiInputBase-root": {
                                  height: 28, // Set your desired height here
                                  padding: "4px 6px", // Adjust padding to make it smaller
                                },
                                "& .MuiOutlinedInput-input": {
                                  padding: "4px 6px", // Input padding
                                },
                              }}
                              slotProps={{
                                input: {
                                  ...params.InputProps,
                                  type: "search",
                                },
                              }}
                            />
                          )}
                        />
                      </Stack>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="contact">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Contact
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="contact"
                        placeholder="Contact No"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="address">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Address
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="city">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        City
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="state">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        State
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="country">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Country
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                </div> */}
                {/* <div className="font-bold text-[15px] text-primary mt-3 mb-1">
                  {" "}
                  Customer And Vendor Details
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <label htmlFor="account_no">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Gst No
                      </Typography>
                    </label>

                    <div className="">
                      <Autocomplete
                        freeSolo
                        id="gst-no-autocomplete"
                        disableClearable
                        options={customerData}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.gst_no || ""
                        }
                        onChange={handleGstNoChange}
                        value={formData.gst_no || ""} // Bind value to formData.gst_no
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option.gst_no}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            name="gst_no"
                            value={formData.gst_no || ""} // Reset input value when formData.gst_no changes
                            onChange={(e) =>
                              handleGstNoChange(e, e.target.value)
                            } // Update input value on type
                            placeholder="Enter or select GST No."
                            sx={{
                              // Adjust the height and padding to reduce overall size
                              "& .MuiInputBase-root": {
                                height: 28, // Set your desired height here
                                padding: "4px 6px", // Adjust padding to make it smaller
                              },
                              "& .MuiOutlinedInput-input": {
                                padding: "4px 6px", // Input padding
                              },
                            }}
                            slotProps={{
                              input: {
                                ...params.InputProps,
                                type: "search",
                              },
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="name">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Name
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="pan">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        PAN
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="pan"
                        placeholder="PAN No"
                        value={formData.pan}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="city">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Customer Address
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="customer_address"
                        placeholder="Customer Address"
                        value={formData.customer_address}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="customer_type">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Customer Type
                      </Typography>
                    </label>

                    <div className="">
                      <div className="col-span-4">
                        <div className="flex gap-10">
                          <Checkbox
                            name="customer"
                            label="Customer"
                            ripple={false}
                            checked={formData.customer || false}
                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0 "
                            onChange={(e) =>
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                customer: e.target.checked, // Update formData when Checkbox changes
                              }))
                            }
                          />
                          <Checkbox
                            name="vendor"
                            label="Vendor"
                            ripple={false}
                            checked={formData.vendor || false}
                            onChange={(e) =>
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                vendor: e.target.checked, // Update formData when Checkbox changes
                              }))
                            }
                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="font-bold text-[15px] text-primary mt-3 mb-1">
                  Products Details
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <label htmlFor="account_no">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Products
                      </Typography>
                    </label>

                    <div className="">
                      <Autocomplete
                        freeSolo
                        id="product-no-autocomplete"
                        disableClearable
                        options={product_ser_Data}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.product_name || ""
                        }
                        onChange={(event, newValue) => {
                          if (newValue) {
                            handleProductChange(event, newValue); // Store the product ID on change
                          }
                        }}
                        value={
                          product_ser_Data.find(
                            (option) => option.id === formData.productID
                          ) || null
                        }
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option.product_name}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            name="product"
                            onChange={(e) =>
                              handleProductChange(e, e.target.value)
                            }
                            placeholder="Enter or select GST No."
                            slotProps={{
                              input: {
                                ...params.InputProps,
                                type: "search",
                              },
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="hsnCode">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        HSN Code
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="hsnCode"
                        placeholder="HSN Code"
                        value={formData.hsnCode}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="gst_rate">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        GST Rate
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="gst_rate"
                        placeholder="GST Rate"
                        value={formData.gst_rate}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="city">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Description
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="desacription"
                        placeholder="Description"
                        value={formData.customer_address}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="unit">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Unit
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="number"
                        size="lg"
                        name="unit"
                        placeholder="Unit"
                        value={formData.customer_address}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="rate">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Description
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="desacription"
                        placeholder="Description"
                        value={formData.customer_address}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateClose}
                  conained="text"
                  color="red"
                  className="mr-1 "
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  conained="contained"
                  type="submit"
                  //   color="green"
                  // onClick={handleCreateClose}
                  className="bg-primary"
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </form>
          </Box>
        </Modal>
      </div>
      <Button
        conained="conained"
        size="md"
        className="bg-primary hover:bg-[#2d5e85]"
        onClick={handleCreateOpen}
      >
        Create
      </Button>
    </>
  );
}

export default SalesCreation;
