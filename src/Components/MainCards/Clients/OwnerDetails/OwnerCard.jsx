import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import { Input, Typography } from "@material-tailwind/react";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DialogFooter, Button } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options = ["None", "Atria", "Callisto"];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  boxShadow: 24,
  paddingTop: "17px", // For vertical (top and bottom) padding
  paddingInline: "40px",
  borderRadius: "10px",
};
const styleCreateMOdal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  boxShadow: 24,
  // p: 4,
  paddingTop: "17px", // For vertical (top and bottom) padding
  paddingInline: "40px",
  borderRadius: "10px",
};
const ITEM_HEIGHT = 48;

export default function OwnerCard({ rowId }) {
  const { id } = useParams();
  // console.log("rowIdowner", rowId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [formData, setFormData] = useState({
    owner_name: "",
    share: "",
    pan: "",
    aadhar: "",
    email: "",
    it_password: "",
    mobile: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log("formmmowner", formData);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/edit-owner/${id}/${rowId}`,
        formData
      );
      toast.success("Owner updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      handleCreateClose();
      setFormData({
        owner_name: "",
        share: "",
        pan: "",
        aadhar: "",
        email: "",
        it_password: "",
        mobile: "",
      });
    } catch (error) {
      toast.error("Failed to update Owner. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleViewOpen = () => {
    setOpenViewModal(true);
    setAnchorEl(null); // Close the menu when modal opens
  };

  const handleViewClose = () => setOpenViewModal(false);
  const handleCreateOpen = async () => {
    setOpenCreateModal(true);
    setAnchorEl(null); // Close the menu when modal opens

    // Fetch the owner details to prepopulate the form
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/edit-owner/${id}/${rowId}`
      );
      setFormData(response.data); // Set the fetched data to formData
    } catch (error) {
      console.error("Error fetching owner data:", error);
      toast.error("Failed to load owner data. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleCreateClose = () => setOpenCreateModal(false);
  const [ownertData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/single-owner/${id}/${rowId}`
        );
        // console.log("ss", response.data);
        setOwnerData(response.data);
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
       <ToastContainer />
       <div>
        <Modal
          open={openViewModal}
          onClose={handleViewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center border-b-2 border-[#366FA1] pb-3"
            >
              Details View
            </Typography>

            {ownertData && (
              <>
                <div>
                  <form className=" my-5 w-full ">
                    <div className="block px-4">
                      <div className="flex gap-6  p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=" "
                            size="sm"
                          >
                            Name :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.owner_name}
                          </div>
                        </div>
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=""
                          >
                            Share :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.share}%
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6   p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=""
                            size="sm"
                          >
                            Pan Number :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.pan}
                          </div>
                        </div>
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=""
                            size="sm"
                          >
                            Aadhar Number :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.aadhar}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6  p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                            size="sm"
                          >
                            Number :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.mobile}
                          </div>
                        </div>
                        <div className="w-full flex gap-3 align-middle items-center">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                            size="sm"
                          >
                            Email :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-6  p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                            size="sm"
                          >
                            Password :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.it_password}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <DialogFooter>
                  <Button
                    conained="gradient"
                    color="red"
                    onClick={handleViewClose}
                    className="mr-1 "
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    conained="gradient"
                    color="green"
                    className="bg-primary"
                    onClick={handleViewClose}
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </>
            )}
          </Box>
        </Modal>
      </div>
      {/* //////////////////////////Update Data Modal open//////// */}

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
              Update Owner Details
            </Typography>
            <form className=" my-5 w-full " onSubmit={handleSubmit}>
                <div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <label htmlFor="owner_name">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Owner Name
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="text"
                          size="lg"
                          name="owner_name"
                          placeholder="Owner Name"
                          value={formData.owner_name}
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
                      <label htmlFor="share">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Share
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="number"
                          size="lg"
                          name="share"
                          placeholder="Share"
                          value={formData.share}
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
                      <label htmlFor="pan">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Pan Number
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="text"
                          size="lg"
                          name="pan"
                          placeholder="Pan Number"
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
                    <div className="col-span-2">
                      <label htmlFor="aadhar">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Aadhar Number
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="number"
                          size="lg"
                          name="aadhar"
                          placeholder="Aadhar Number"
                          value={formData.aadhar}
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
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
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
                      <label htmlFor="it_password">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Password
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="password"
                          size="lg"
                          name="it_password"
                          placeholder="Password"
                          value={formData.it_password}
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
                      <label htmlFor="aadhar">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Mobile Number
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="number"
                          size="lg"
                          name="mobile"
                          placeholder="Mobile Number"
                          value={formData.mobile}
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
                    conained="filled"
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



{/* /////////////////////////////delete modal//////////////////// */}

<div>
        <Modal
          open={openViewModal}
          onClose={handleViewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center border-b-2 border-[#366FA1] pb-3"
            >
              Details View
            </Typography>
{/* 
            {ownertData && (
              <>
                <div>
                  <form className=" my-5 w-full ">
                    <div className="block px-4">
                      <div className="flex gap-6  p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=" "
                            size="sm"
                          >
                            Name :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.owner_name}
                          </div>
                        </div>
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=""
                          >
                            Share :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.share}%
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6   p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=""
                            size="sm"
                          >
                            Pan Number :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.pan}
                          </div>
                        </div>
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className=""
                            size="sm"
                          >
                            Aadhar Number :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.aadhar}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6  p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                            size="sm"
                          >
                            Number :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.mobile}
                          </div>
                        </div>
                        <div className="w-full flex gap-3 align-middle items-center">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                            size="sm"
                          >
                            Email :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-6  p-2">
                        <div className="w-full flex gap-3">
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-1"
                            size="sm"
                          >
                            Password :
                          </Typography>
                          <div className="text-gray-700 text-[15px] my-auto">
                            {ownertData.it_password}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <DialogFooter>
                  <Button
                    conained="gradient"
                    color="red"
                    onClick={handleViewClose}
                    className="mr-1 "
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    conained="gradient"
                    color="green"
                    className="bg-primary"
                    onClick={handleViewClose}
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </>
            )} */}


<DialogFooter>
                  <Button
                    conained="gradient"
                    color="red"
                    onClick={handleViewClose}
                    className="mr-1 "
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    conained="gradient"
                    color="green"
                    className="bg-primary"
                    onClick={handleViewClose}
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
          </Box>
        </Modal>
      </div>









      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            },
          }}
        >
          <MenuItem onClick={handleViewOpen}>View</MenuItem>
          <MenuItem onClick={handleCreateOpen}>Update</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    </>
  );
}
