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
  p: 4,
  borderRadius: "10px",
};
const styleCreateMOdal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  //   border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const ITEM_HEIGHT = 48;

export default function Card() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
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
  const handleCreateOpen = () => {
    setOpenCreateModal(true);
    setAnchorEl(null); // Close the menu when modal opens
  };

  const handleCreateClose = () => setOpenCreateModal(false);

  return (
    <>
      <div>
        <Modal
          open={openViewModal}
          onClose={handleViewClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* <div className="grid grid-cols-2">
                <div className="flex justify-around align-middle items-center mb-2">
                  <div className="text-lg font-semi-bold">Name:</div>
                  <div className="text-base text-gray-500">Atul Singh</div>
                </div>
                <div className="flex justify-around align-middle items-center mb-2">
                  <div className="text-xl font-semi-bold">Name:</div>
                  <div className="text-lg text-gray-500">Atul Singh</div>
                </div>
                <div className="flex justify-around align-middle items-center mb-2">
                  <div className="text-xl font-semi-bold">Name:</div>
                  <div className="text-lg text-gray-500">Atul Singh</div>
                </div>
              </div> */}
              <div>
                <form className=" my-5 w-full ">
                  <div className="block px-4">
                    <div className="flex gap-6  border border-[#366FA1] p-3">
                      <div className="w-full flex gap-6">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className=" "
                          size="sm"
                        >
                          Tan Number :
                        </Typography>
                        <div>viewData?.tan_number</div>
                      </div>
                      <div className="w-full flex gap-6">
                        <Typography variant="h6" color="blue-gray" className="">
                          Filling Frequency :
                        </Typography>
                        <div>viewData?.filling_freq</div>
                      </div>
                    </div>

                    <div className="flex gap-6   border-b border-l border-r border-[#366FA1] p-3">
                      <div className="w-full flex gap-6">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className=""
                          size="sm"
                        >
                          Login Email :
                        </Typography>
                        <div>viewData?.tan_login</div>
                      </div>
                      <div className="w-full flex gap-6">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className=""
                          size="sm"
                        >
                          Login Password :
                        </Typography>
                        <div className="">viewDatatan_password</div>
                      </div>
                    </div>

                    <div className="flex gap-6  border-b border-l border-r border-[#366FA1] p-3">
                      <div className="w-full flex gap-6">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="mb-1"
                          size="sm"
                        >
                          Remarks :
                        </Typography>
                        <div>viewData?.remarks</div>
                      </div>
                      <div className="w-full flex gap-6 align-middle items-center">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="mb-1"
                          size="sm"
                        >
                          Attactments :
                        </Typography>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleViewClose}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleViewClose}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Typography>
          </Box>
        </Modal>
      </div>

      {/* //////////////////////////Create Data Modal open//////// */}

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
              Create Details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <form className=" my-5 w-full ">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Your Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email Address"
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900 shadow-lg  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Your Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email Address"
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900 shadow-lg  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Your Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email Address"
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900 shadow-lg  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Your Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email Address"
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900 shadow-lg  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Your Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email Address"
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900 shadow-lg  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-semibold mb-2"
                        >
                          Your Email
                        </Typography>
                      </label>

                      <div className="">
                        <Input
                          type="email"
                          size="lg"
                          placeholder="Email Address"
                          className="!border !border-[#cecece] bg-white py-1 text-gray-900 shadow-lg  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-[#366FA1] focus:!border-t-[#366FA1] "
                          labelProps={{
                            className: "hidden",
                          }}
                          containerProps={{ className: "min-w-[100px]" }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCreateClose}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleCreateClose}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Typography>
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
          <MoreVertIcon />
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
