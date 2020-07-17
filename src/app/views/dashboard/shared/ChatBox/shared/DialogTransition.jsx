import React, { useState, forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Fab,
  Icon,
  Card,
} from "@material-ui/core";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = useState(true);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Show Video Call Comp
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{ className: "bg-transparent shadow-none" }}
        fullWidth
        maxWidth="lg"
      >
        <Card>
          {/* here you attach video Comp */}

          <img
            src="/assets/images/photo-1.jpg"
            className="w-full object-contain bg-black"
          />
        </Card>
        <div className="bg-transparent flex justify-center mt-8">
          <Fab className="bg-gray-900 mx-6 text-white" size="small">
            <Icon fontSize="small">fullscreen_exit</Icon>
          </Fab>
          <Fab className="bg-gray-900 mx-6 text-white" size="small">
            <Icon fontSize="small">videocam</Icon>
          </Fab>
          <Fab className="bg-gray-900 mx-6 text-white" size="small">
            <Icon fontSize="small">mic</Icon>
          </Fab>
          <Fab
            className="bg-red-600 mx-6 text-white"
            size="small"
            onClick={handleClose}
          >
            <Icon fontSize="small">call_end</Icon>
          </Fab>
          <Fab className="bg-gray-900 mx-6 text-white" size="small">
            <Icon fontSize="small">forum</Icon>
          </Fab>
        </div>
      </Dialog>
    </div>
  );
}
