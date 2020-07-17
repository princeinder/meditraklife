import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  IconButton,
  Icon,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  InputLabel,
  MenuItem,
  Button,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ChatTabs from "./Tabs";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "490px !important",
    minHeight: "490px !important",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
}));

const DialogSelect = (props) => {
  const { handleChange, handleClose, option, role, open } = props;
  const classes = useStyles();
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Fill the form</DialogTitle>
      <DialogContent>
        <form>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">{role}</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={option}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="John">John</MenuItem>
              <MenuItem value="Guy">Guy</MenuItem>
              <MenuItem value="Mith">Mith</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ChatBox = (props) => {
  const classes = useStyles();
  const userRole = useSelector(({ user }) => user.role);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card className=" p-0 " classes={{ root: classes.root }}>
      <DialogSelect
        open={open}
        role={userRole.toLowerCase() === "physician" ? "facility" : "physician"}
        option={option}
        handleChange={handleChange}
        handleClose={handleClose}
      />
      <div className="p-2 px-4 flex justify-between items-center">
        <p className="card-title capitalize">
          Select{" "}
          {userRole.toLowerCase() === "physician" ? "facility" : "physician"}
        </p>
        <div>
          <IconButton onClick={handleClickOpen}>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>
      <Divider />

      <Card elevation={0} style={{ height: "88%" }}>
        <ChatTabs />
      </Card>
    </Card>
  );
};

export default ChatBox;
