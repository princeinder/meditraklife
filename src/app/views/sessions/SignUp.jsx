import React, { useState, Fragment, useContext } from "react";
import {
  Icon,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Fab,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import { Alert, ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import validationSchema from "../../common/ValidationScehma";
import SessionLayout from "./SessionLayout";
import { firebaseSignUpEmailPassword } from "../../redux/actions/LoginActions";
import history from "history.js";

const useStyles = makeStyles((theme) => {
  return {
    radioBox: {
      height: "170px",
    },
    selectBtn: (props) => {
      const { formS } = props;
      return {
        border: "1px solid #718096",
      };
    },
    btnImg: {
      margin: "auto",
      height: "80%",
    },
  };
});

const SignUp = (props) => {
  const [remember, setRemember] = useState(false);
  const {
    handleSubmit,
    errors,
    control,
    reset,
    setError,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      role: "FACILITY",
      fullname: "",
      UID: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    validationSchema: validationSchema.SignUp,
  });
  const classes = useStyles({ formS: watch() });
  // const { dispatch } = useContext(MyContext);
  const dispatchMain = useDispatch();
  const [loading, setloading] = useState(false);

  const { role } = watch();
  const handleFormSubmit = (data, e) => {
    setloading(true);

    // dispatchMain(firebaseSignUpEmailPassword(data))
    //   .then(res => {
    //     setloading(false);
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //     reset();
    //     setError("agreement", "", err);
    //     setloading(false);
    //   });
    setTimeout(() => {
      setloading(false);
      history.push("/session/signin");
    }, 1000);
  };
  return (
    <SessionLayout>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full z-50 opacity-50 bg-white flex flex-col items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <Typography variant="h6" style={{ lineHeight: 3.6 }}>
        Choose your account type
      </Typography>
      <div className="relative">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={`flex mb-24  ${classes.radioBox}`}>
            <div
              className={`w-8/12 mr-2 pb-1 shadow-lg rounded-lg cursor-pointer flex flex-col ${
                classes.selectBtn
              } ${
                role === "FACILITY"
                  ? " border-indigo-600 border-2 "
                  : " border-gray-400 "
              }`}
              onClick={() => setValue("role", "FACILITY")}
            >
              <div className={`${classes.btnImg} px-2 pt-2 pb-1 `}>
                <img
                  className="mx-auto h-full rounded-full"
                  src="/assets/illustrations/facility-i2.svg"
                />
              </div>
              <Typography className="text-center font-medium">
                Facility
              </Typography>
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                className="absolute self-end"
                style={{ top: "148px" }}
                // className={classes.margin}
              >
                <LiveHelpIcon />
              </Fab>
            </div>
            <div
              className={`w-8/12 ml-2 pb-1 shadow-lg rounded-lg cursor-pointer flex flex-col ${
                classes.selectBtn
              }  ${
                role === "PHYSICIAN"
                  ? " border-indigo-600 border-2 "
                  : " border-gray-400 "
              }`}
              onClick={() => setValue("role", "PHYSICIAN")}
            >
              <div className={`${classes.btnImg} px-2 pt-2 pb-1`}>
                <img
                  className="mx-auto h-full rounded-full"
                  src="/assets/illustrations/physician-i2.svg"
                />
              </div>
              <Typography className="text-center font-medium">
                Physician
              </Typography>
            </div>
          </div>

          <Controller
            control={control}
            name="role"
            as={
              <input
                name="role"
                className="hidden"
                type="radio"
                value="FACILITY"
              />
            }
          />
          <Typography className="font-medium">Full Name</Typography>
          <Controller
            control={control}
            name="fullname"
            as={
              <TextField
                className="my-2"
                variant="outlined"
                type="text"
                fullWidth
                error={!!errors.fullname}
                helperText={errors.fullname && errors.fullname.message}
                InputProps={{
                  startAdornment: (
                    <Icon fontSize="small" className="text-muted">
                      person
                    </Icon>
                  ),
                  inputProps: {
                    className: "py-3",
                    style: {
                      paddingLeft: 8,
                    },
                  },
                }}
              />
            }
          />
          <Typography className="font-medium">User ID</Typography>
          <Controller
            control={control}
            name="UID"
            as={
              <TextField
                className="my-2"
                variant="outlined"
                type="text"
                fullWidth
                error={!!errors.UID}
                helperText={errors.UID && errors.UID.message}
                InputProps={{
                  startAdornment: (
                    <Icon fontSize="small" className="text-muted">
                      person
                    </Icon>
                  ),
                  inputProps: {
                    className: "py-3",
                    style: {
                      paddingLeft: 8,
                    },
                  },
                }}
              />
            }
          />
          <Typography className="font-medium">Email</Typography>
          <Controller
            control={control}
            name="email"
            as={
              <TextField
                className="my-2"
                variant="outlined"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                InputProps={{
                  startAdornment: (
                    <Icon fontSize="small" className="text-muted">
                      mail
                    </Icon>
                  ),
                  inputProps: {
                    className: "py-3",
                    style: {
                      paddingLeft: 8,
                    },
                  },
                }}
              />
            }
          />
          <Typography className="font-medium">Password</Typography>
          <Controller
            control={control}
            name="password"
            as={
              <TextField
                className="my-2"
                variant="outlined"
                type="password"
                className="my-4"
                fullWidth
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                InputProps={{
                  startAdornment: (
                    <Icon fontSize="small" className="text-muted">
                      lock
                    </Icon>
                  ),
                  inputProps: {
                    className: "py-3",
                    style: {
                      paddingLeft: 8,
                    },
                  },
                }}
              />
            }
          />
          {errors.agreement && (
            <Alert className="my-2" severity="error">
              {errors.agreement.message}
            </Alert>
          )}
          <div className="mt-4 flex items-center justify-between">
            <Fragment>
              <Button
                className="capitalize w-2/5 font-semibold"
                variant="outlined"
                color="primary"
                type="submit"
              >
                Register
              </Button>
              <Button
                className="capitalize w-2/5 font-semibold"
                variant="contained"
                color="primary"
                onClick={() => props.history.push("/session/signin")}
              >
                Log in
              </Button>
            </Fragment>
          </div>
          <FormControlLabel
            value={remember}
            control={<Checkbox color="primary" />}
            label="Remember me"
            labelPlacement="end"
            onChange={() => setRemember((prev) => !prev)}
          />
        </form>
      </div>
    </SessionLayout>
  );
};

export default SignUp;
