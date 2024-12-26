import { Button, DialogFooter } from "@material-tailwind/react";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { Autocomplete, Stack, TextField } from "@mui/material";
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
function OfficeLocCreation({ fetchBranchDetails }) {
  const { branchID } = useParams();
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleCreateOpen = () => {
    setOpenCreateModal(true);
    setAnchorEl(null);
  };

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country?.isoCode));
    setCities([]);
    setSelectedState(null);
    setSelectedCity(null); // Reset city when country changes
    setFormData((prev) => ({
      ...prev,
      country: country?.name, // Update formData with selected country
    }));
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(City.getCitiesOfState(selectedCountry?.isoCode, state?.isoCode));
    setSelectedCity(null); // Reset city when state changes
    setFormData((prev) => ({
      ...prev,
      state: state?.name, // Update formData with selected state
    }));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setFormData((prev) => ({
      ...prev,
      city: city?.name, // Update formData with selected city
    }));
  };

  const handleCreateClose = () => setOpenCreateModal(false);
  const [formData, setFormData] = useState({
    location: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  console.log("formmm", formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Create a FormData object
      const formDataToSend = new FormData();

      // Append text fields to FormData
      formDataToSend.append("location", formData.location);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("country", formData.country);

      // Make a POST request to your API
      const response = await axios.post(
        `http://127.0.0.1:8000/api/create-officelocation/${branchID}`,
        formDataToSend
      );

      console.log(response.data); // Handle success response

      // if (response.status === 200 && response.data.Message === "Office Location Created") {
      // Success
      fetchBranchDetails();

      setFormData({
        location: "",
        contact: "",
        address: "",
        city: "",
        state: "",
        country: "",
      });
      handleCreateClose();

      toast.success("Office Location details created successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to create bank details. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div>
        <Modal
          open={openCreateModal}
          onClose={handleCreateClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleCreateMOdal}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center border-b-2 border-[#366FA1] pb-3"
            >
              Create Office Location Details
            </Typography>
            <form className=" my-5 w-full " onSubmit={handleSubmit}>
              <div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <label htmlFor="location">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Location
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-full" }}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="contact">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Contact No.
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="number"
                        size="lg"
                        name="contact"
                        placeholder="Contact Number"
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
                  <div className="col-span-2">
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
                      <div className="">
                        <div className="">
                          <Stack spacing={1} sx={{ width: 300 }}>
                            <Autocomplete
                              id="country-select"
                              options={countries}
                              freeSolo={true} // Allow free text input
                              disableClearable={false} // Allow clearing with a single icon
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : `${option.flag} ${option.name}`
                              }
                              onChange={(event, newValue) =>
                                handleCountryChange(newValue)
                              }
                              renderOption={(props, option) => (
                                <li
                                  {...props}
                                  key={option.isoCode}
                                  style={{
                                    padding: "4px 8px",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {option.flag} {option.name}
                                </li>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  placeholder="Select Country"
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      height: 33,
                                      padding: "4px 6px",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                      padding: "4px 6px",
                                    },
                                  }}
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                      <>{params.InputProps.endAdornment}</>
                                    ),
                                  }}
                                />
                              )}
                            />
                          </Stack>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
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
                      <div className="">
                        <div className="">
                          <Stack spacing={1} sx={{ width: 300 }}>
                            <Autocomplete
                              id="state-select"
                              options={states}
                              freeSolo={true}
                              disableClearable={false}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, newValue) =>
                                handleStateChange(newValue)
                              }
                              renderOption={(props, option) => (
                                <li
                                  {...props}
                                  key={option.isoCode}
                                  style={{
                                    padding: "4px 8px",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {option.name}
                                </li>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  placeholder="Select State"
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      height: 33,
                                      padding: "4px 6px",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                      padding: "4px 6px",
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
                  <div className="col-span-2">
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
                      <div className="">
                        <div className="">
                          <Stack spacing={1} sx={{ width: 300 }}>
                            <Autocomplete
                              id="city-select"
                              options={cities}
                              freeSolo={true}
                              disableClearable={false}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, newValue) => {
                                setSelectedCity(newValue);
                                setFormData((prevData) => ({
                                  ...prevData,
                                  city: newValue ? newValue.name : "",
                                }));
                              }}
                              renderOption={(props, option) => (
                                <li
                                  {...props}
                                  key={option.name}
                                  style={{
                                    padding: "4px 8px",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {option.name}
                                </li>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  placeholder="Select City"
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      height: 33,
                                      padding: "20px 6px",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                      padding: "20px 6px",
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
                  <div className="col-span-4">
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

export default OfficeLocCreation;
