import React, { useState } from "react";
import { Dialog, DialogActions, Button } from "@material-ui/core";
import { DateRangePicker } from "@matharumanpreet00/react-daterange-picker";

const DateRangePickerDialog = (props) => {
  const { isOpen, handleClose, dateRange, dateHandler } = props;
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
      <DateRangePicker open={isOpen} onChange={dateHandler} />
      <DialogActions>
        <Button onClick={handleClose}>ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateRangePickerDialog;
