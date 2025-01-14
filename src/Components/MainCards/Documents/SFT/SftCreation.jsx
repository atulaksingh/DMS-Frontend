
import React, { useState, useCallback } from "react";
import { Button, DialogFooter, Typography, Input } from "@material-tailwind/react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchClientDetails } from "../../../Redux/clientSlice";

// Styles for modal
const styleCreateModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function SftCreation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    financial_year: "",
    month: "",
    files: [],
  });

  const handleCreateOpen = useCallback(() => setOpenCreateModal(true), []);
  const handleCreateClose = useCallback(() => setOpenCreateModal(false), []);

  // Unified input change handler
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: Array.from(e.target.files), // Converts file list to an array
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("financial_year", formData.financial_year);
      formDataToSend.append("month", formData.month);
      formData.files.forEach((file) => formDataToSend.append("files", file));

      // Make a POST request to your API
      const response = await axios.post(
        `http://127.0.0.1:8000/api/create-sft/${id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`${response.data.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
        dispatch(fetchClientDetails(id));
        // Optionally close the modal and reset form
        handleCreateClose();
  
        // Clear the form data after successful response
        setFormData({
          financial_year: "",
          month: "",
          files: [],
        });
  
        // Clear the selected dates
        setSelectedYear(null);
        setSelectedMonth(null);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to create Sft details. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Modal
        open={openCreateModal}
        onClose={handleCreateClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styleCreateModal}>
          <Typography
            id="modal-title"
            variant="h5"
            className="text-center border-b-2 border-[#366FA1] pb-3"
          >
            Sft Bank Details
          </Typography>
          <form className="my-5 w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <Typography
                  variant="small"
                  className="block font-semibold mb-1"
                >
                  Log In Year
                </Typography>
                <DatePicker
                  selected={selectedYear}
                  onChange={(date) => {
                    setSelectedYear(date);
                    handleInputChange("financial_year", date.getFullYear());
                  }}
                  showYearPicker
                  dateFormat="yyyy"
                  className="w-full px-3 py-2 border border-[#cecece] bg-white py-1 text-gray-900 focus:border-[#366FA1]"
                  placeholderText="Select Year"
                />
              </div>

              <div className="col-span-2">
                <Typography
                  variant="small"
                  className="block font-semibold mb-1"
                >
                  Month
                </Typography>
                <DatePicker
                  selected={selectedMonth}
                  onChange={(date) => {
                    setSelectedMonth(date);
                    handleInputChange("month", format(date, "MMMM"));
                  }}
                  showMonthYearPicker
                  dateFormat="MMMM"
                  className="w-full px-3 py-2 border border-[#cecece] bg-white py-1 text-gray-900 focus:border-[#366FA1]"
                  placeholderText="Select Month"
                />
              </div>

              <div className="col-span-4">
                <Typography
                  variant="small"
                  className="block font-semibold mb-2"
                >
                  Attachments
                </Typography>
                <input
                  type="file"
                  name="files"
                  onChange={handleFileChange}
                  multiple
                  className="file-input file-input-bordered file-input-success w-full max-w-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreateClose}
                variant="text"
                color="red"
                className="mr-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Box>
      </Modal>

      <Button
        size="md"
        className="bg-primary hover:bg-[#2d5e85]"
        onClick={handleCreateOpen}
      >
        Create
      </Button>
    </>
  );
}

export default SftCreation;
