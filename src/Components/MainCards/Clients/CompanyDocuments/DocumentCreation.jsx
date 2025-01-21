

import { Button, DialogFooter } from "@material-tailwind/react";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
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
function DocumentCreation() {
    const { id } = useParams();
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleCreateOpen = () => {
    setOpenCreateModal(true);
    setAnchorEl(null);
  };

  const handleCreateClose = () => setOpenCreateModal(false);
  const [formData, setFormData] = useState({
    account_no: "",
    bank_name: "",
    ifsc: "",
    account_type: "",
    branch: "",
  });
  const [attachment, setAttachment] = useState(null); // State for file input
  const notify = (message, type = "success") => {
    toast[type](message, { position: "top-right", autoClose: 1000 });
  };

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
        `https://admin.dms.zacoinfotech.com/api/create-bank/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data); // Handle success response
      toast.success("Bank details created successfully!", {
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

  return (
    <>
    <ToastContainer />
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
              Create Bank Details
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
                <Select
                  label="file_name"
                  name="file_name"
                  size="lg"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  className="!border !border-[#cecece] bg-white pt-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={fileName}
                  onChange={handleFileNameChange}
                >
                  <Option value="udym">Udyam Aadhar</Option>
                  <Option value="pan">PAN</Option>
                  <Option value="tan">TAN</Option>
                  <Option value="msme">MSME</Option>
                  <Option value="mca">MCA</Option>
                  <Option value="esic">ESIC</Option>
                  <Option value="other">Other</Option>
                </Select>
              </div>
                    </div>

                    <div className="col-span-2">
                    <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-semibold mb-1"
              >
                Log In
              </Typography>
              <Input
                type="text"
                size="lg"
                name="login"
                value={login}
                onChange={handleLoginChange}
                placeholder="Login"
                className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                labelProps={{ className: "hidden" }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
                    </div>
                    <div className="col-span-2">
                    <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="block font-semibold mb-1"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
                className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                labelProps={{ className: "hidden" }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
                    </div>

                    <div className="col-span-2">
                    <div>
              <label htmlFor="remarks">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-semibold mb-2"
                >
                  Remark
                </Typography>
              </label>

              <div className="">
                <Textarea
                  type="text"
                  size="lg"
                  name="remark"
                  value={remark}
                  onChange={handleRemarkChange}
                  placeholder="Remarks"
                  className="!border !border-[#cecece] bg-white py-1 text-gray-900   ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
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

export default DocumentCreation;
