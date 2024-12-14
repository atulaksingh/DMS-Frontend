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
import { useDispatch } from "react-redux";
import { fetchClientDetails } from "../../../Redux/clientSlice";
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
function TdsPaymentCreation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleCreateOpen = () => {
    setOpenCreateModal(true);
    setAnchorEl(null);
  };

  const handleCreateClose = () => setOpenCreateModal(false);
  const [formData, setFormData] = useState({
    client_name: "",
    date: "",
    PAN: "",
    amount: "",
    cgst: "",
    sgst: "",
    igst: "",
    total_amt: "",
    tds_rate: "",
    tds_section: "",
    tds_amount: "",
    net_amount: "",
  });

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
      formDataToSend.append("client_name", formData.client_name);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("PAN", formData.PAN);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("cgst", formData.cgst);
      formDataToSend.append("sgst", formData.sgst);
      formDataToSend.append("igst", formData.igst);
      formDataToSend.append("total_amt", formData.total_amt);
      formDataToSend.append("tds_rate", formData.tds_rate);
      formDataToSend.append("tds_section", formData.tds_section);
      formDataToSend.append("tds_amount", formData.tds_amount);
      formDataToSend.append("net_amount", formData.net_amount);
  
      // Make a POST request to your API
      const response = await axios.post(
        `http://127.0.0.1:8000/api/create-tdspayment/${id}`,
        formDataToSend
      );
  
      if (response.status === 200) { // Check if response is successful
        console.log(response.data); // Handle success response
        toast.success(`${response.data.Message}`, {
          position: "top-right",
          autoClose: 2000,
        });
  
        // Dispatch fetchClientDetails action
        dispatch(fetchClientDetails(id));
  
        // Optionally close the modal and reset form
        handleCreateClose();
        setFormData({
          client_name: "",
          date: "",
          PAN: "",
          amount: "",
          cgst: "",
          sgst: "",
          igst: "",
          total_amt: "",
          tds_rate: "",
          tds_section: "",
          tds_amount: "",
          net_amount: "",
        });
      } else {
        throw new Error("Failed to create Tds Payment details.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to create Tds Payment details. Please try again.", {
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
              Create Tds Payment Details
            </Typography>
            <form className="my-5 w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 gap-4">
                {/* Client Name */}
                <div className="col-span-4">
                  <label htmlFor="client_name">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      Client Name
                    </Typography>
                  </label>
                  <Input
                    type="text"
                    size="lg"
                    name="client_name"
                    placeholder="Client Name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <label htmlFor="date">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      Date
                    </Typography>
                  </label>
                  <Input
                    type="date"
                    size="lg"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* PAN */}
                <div className="col-span-2">
                  <label htmlFor="PAN">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      PAN
                    </Typography>
                  </label>
                  <Input
                    type="text"
                    size="lg"
                    name="PAN"
                    placeholder="PAN"
                    value={formData.PAN}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <label htmlFor="amount">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      Amount
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* CGST */}
                <div className="col-span-2">
                  <label htmlFor="cgst">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      CGST
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="cgst"
                    placeholder="CGST"
                    value={formData.cgst}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* SGST */}
                <div className="col-span-2">
                  <label htmlFor="sgst">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      SGST
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="sgst"
                    placeholder="SGST"
                    value={formData.sgst}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* IGST */}
                <div className="col-span-2">
                  <label htmlFor="igst">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      IGST
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="igst"
                    placeholder="IGST"
                    value={formData.igst}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* Total Amount */}
                <div className="col-span-2">
                  <label htmlFor="total_amt">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      Total Amount
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="total_amt"
                    placeholder="Total Amount"
                    value={formData.total_amt}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* TDS Rate */}
                <div className="col-span-2">
                  <label htmlFor="tds_rate">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      TDS Rate
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="tds_rate"
                    placeholder="TDS Rate"
                    value={formData.tds_rate}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* TDS Section */}
                <div className="col-span-2">
                  <label htmlFor="tds_section">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      TDS Section
                    </Typography>
                  </label>
                  <Input
                    type="text"
                    size="lg"
                    name="tds_section"
                    placeholder="TDS Section"
                    value={formData.tds_section}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* TDS Amount */}
                <div className="col-span-2">
                  <label htmlFor="tds_amount">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      TDS Amount
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="tds_amount"
                    placeholder="TDS Amount"
                    value={formData.tds_amount}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {/* Net Amount */}
                <div className="col-span-2">
                  <label htmlFor="net_amount">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-semibold mb-2"
                    >
                      Net Amount
                    </Typography>
                  </label>
                  <Input
                    type="number"
                    size="lg"
                    name="net_amount"
                    placeholder="Net Amount"
                    value={formData.net_amount}
                    onChange={handleInputChange}
                    className="!border !border-[#cecece] bg-white py-1 text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1]"
                    containerProps={{ className: "min-w-full" }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
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

export default TdsPaymentCreation;
