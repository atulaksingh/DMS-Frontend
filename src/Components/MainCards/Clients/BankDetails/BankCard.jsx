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

export default function BankCard({ rowId }) {
  const { id } = useParams();
  // console.log("rowIdbank", rowId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    account_no: "",
    bank_name: "",
    ifsc: "",
    account_type: "",
    branch: "",
  });
  const [attachment, setAttachment] = useState(null); // State for file input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handle file input change
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Create a FormData object
      const formDataToSend = new FormData();

      // Append text fields to FormData
      formDataToSend.append("account_no", formData.account_no);
      formDataToSend.append("bank_name", formData.bank_name);
      formDataToSend.append("ifsc", formData.ifsc);
      formDataToSend.append("account_type", formData.account_type);
      formDataToSend.append("branch", formData.branch);

      // Append file field to FormData
      if (attachment) {
        formDataToSend.append("attachment", attachment);
      }

      // Make a POST request to your API
      const response = await axios.post(
        `http://127.0.0.1:8000/api/edit-bank/${id}/${rowId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Handle success response
      toast.success("Bank details update successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      // Optionally close the modal and reset form
      handleCreateClose();
      setFormData({
        account_no: "",
        bank_name: "",
        ifsc: "",
        account_type: "",
        branch: "",
      });
      setAttachment(null); // Clear the file input
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to create bank details. Please try again.", {
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
  // console.log("row123", deleteId);
  const handleDeleteOpen = () => {
    setDeleteId(rowId);
    setOpenDeleteModal(true);
    setAnchorEl(null);
  };
  const handleDeleteID = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-bank/${id}/${deleteId}`
      );
      // console.log("res-----bank---->", response);
      setOpenDeleteModal(false);
      if (response.status === 200) {
        toast.success("bank deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to delete bank. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting bank data:", error);
      toast.error("Failed to delete bank. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleViewOpen = () => {
    setOpenViewModal(true);
    setAnchorEl(null);
  };

  const handleDeleteClose = () => setOpenDeleteModal(false);
  const handleViewClose = () => setOpenViewModal(false);
  const handleCreateOpen = async () => {
    setOpenCreateModal(true);
    setAnchorEl(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/edit-bank/${id}/${rowId}`
      );
      console.log("dd", response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching bank data:", error);
      toast.error("Failed to load bank data. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleCreateClose = () => setOpenCreateModal(false);
  const [bankData, setBankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/single-bank/${id}/${rowId}`
        );
        setBankData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBankDetails();
  }, [id, rowId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading client details: {error.message}</div>;
  // }
  return (
    <>
      <ToastContainer />
      <div>
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

              {bankData && (
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
                              Account Number :
                            </Typography>
                            <div className="text-gray-700 text-[15px] my-auto">
                              {bankData.account_no}
                            </div>
                          </div>
                          <div className="w-full flex gap-3">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className=""
                            >
                              Account Type :
                            </Typography>
                            <div className="text-gray-700 text-[15px] my-auto">
                              {bankData.account_type}
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
                              Bank Name :
                            </Typography>
                            <div className="text-gray-700 text-[15px] my-auto">
                              {bankData.bank_name}
                            </div>
                          </div>
                          <div className="w-full flex gap-3">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className=""
                              size="sm"
                            >
                              Branch Name :
                            </Typography>
                            <div className="text-gray-700 text-[15px] my-auto">
                              {bankData.branch}
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
                              IFSC Code :
                            </Typography>
                            <div className="text-gray-700 text-[15px] my-auto">
                              {bankData.ifsc}
                            </div>
                          </div>
                          <div className="w-full flex gap-3 align-middle items-center">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="mb-1"
                              size="sm"
                            >
                              Attachment :
                            </Typography>
                            <div className="text-gray-700 text-[15px] my-auto">
                              {bankData.attachment}
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
              Update bank Details
            </Typography>
            <form className=" my-5 w-full " onSubmit={handleSubmit}>
              <div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <label htmlFor="account_no">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Account Number
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="number"
                        size="lg"
                        name="account_no"
                        placeholder="Account Number"
                        value={formData.account_no}
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
                    <label htmlFor="bank_name">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Bank Name
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="bank_name"
                        placeholder="Bank Name"
                        value={formData.bank_name}
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
                    <label htmlFor="account_type">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Account Type
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="account_type"
                        placeholder="Account Type"
                        value={formData.account_type}
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
                    <label htmlFor="branch">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Branch
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="branch"
                        placeholder="Branch"
                        value={formData.branch}
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
                    <label htmlFor="ifsc">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        IFSC Code
                      </Typography>
                    </label>

                    <div className="">
                      <Input
                        type="text"
                        size="lg"
                        name="ifsc"
                        placeholder="IFSC Code"
                        value={formData.ifsc}
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
                    <label htmlFor="attachment">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Attachments
                      </Typography>
                    </label>

                    <div className="">
                      <input
                        type="file"
                        name="attachment"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered file-input-success w-full max-w-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="attachment">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-semibold mb-2"
                      >
                        Attachments
                      </Typography>
                    </label>

                    <div className="">
                      {formData.attachment && (
                        <p className="text-sm text-gray-500 mt-2">
                          Selected file:
                          <a
                            href={`http://127.0.0.1:8000/${formData.attachment}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {formData.attachment.name ||
                              formData.attachment.replace("/media/", "")}
                          </a>
                        </p>
                      )}
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

      {/* /////////////////////////////delete modal//////////////////// */}

      <div>
        <Modal
          open={openDeleteModal}
          onClose={handleDeleteClose}
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
              Delete
            </Typography>

            <div>
              <div className="w-full max-w-md mx-auto pb-7">
                <div className="my-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 fill-red-500 inline"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                      data-original="#000000"
                    />
                    <path
                      d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                      data-original="#000000"
                    />
                  </svg>
                  <h4 className="text-gray-800 text-lg font-semibold mt-4">
                    Are you sure you want to delete it?
                  </h4>
                  <p className="text-sm text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    type="button"
                    onClick={handleDeleteID}
                    className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteClose}
                    className="px-4 py-2 rounded-lg text-gray-800 text-sm tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
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
          <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
        </Menu>
      </div>
    </>
  );
}