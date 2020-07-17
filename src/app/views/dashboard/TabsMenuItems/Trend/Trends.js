import React, { useState, Fragment, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  Icon,
  Slider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import _Loadash from "lodash";
import DateRangePickerDialog from "./../../shared/DateRangePickerDialog";
import moment from "moment";
import { TrendGraph } from "./Graph/TrendGraph";
import DataFile from "./utils/DummyData_00.json";
import { min, max, mean } from "d3";

const initialValue = {
  bloodPressure: true,
  respiration: false,
  oxygenSaturation: false,
  pulse: false,
  temperature: false,
  sepsisWatch: false,
};
const TrendTab = (props) => {
  const { theme } = props;
  const [data, setData] = useState(DataFile);
  const [options, setOptions] = useState(initialValue);
  const [selectAll, setSelectAll] = useState(false);
  const [dateObj, setDateObj] = useState({
    dateRange: {},
    isOpen: false,
  });
  const [avgValues, setAvgValues] = useState(DataFile);
  const GetMinDate = (data) => {
    return min(data.map((d) => new Date(d.Timestamp).getTime()));
  };

  const GetMaxDate = (data) => {
    return max(data.map((d) => new Date(d.Timestamp).getTime()));
  };
  const [ZoomState, setZoomState] = useState([
    GetMinDate(data),
    GetMaxDate(data),
  ]);
  const handleChange = (event) => {
    const updatedObj = {
      ...options,
      [event.target.name]: event.target.checked,
    };
    setOptions(updatedObj);
    if (Object.values(updatedObj).every((v) => v === true)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };
  const HandleSelectAll = (event) => {
    const {
      target: { checked },
    } = event;
    setSelectAll(checked);
    setOptions((prev) => ({
      bloodPressure: checked,
      respiration: checked,
      oxygenSaturation: checked,
      pulse: checked,
      temperature: checked,
      sepsisWatch: checked,
    }));
  };
  const dateObjHandler = (name, value) => {
    setDateObj((prev) => ({ ...prev, [name]: value }));
  };
  const handleZoomChange = (e, value) => {
    setZoomState(value);
  };
  useEffect(() => {
    const { dateRange } = dateObj;
    const dateFormat = (date) => new Date(date).getTime();
    if (dateRange.startDate && dateRange.endDate) {
      var filteredData = DataFile.filter((d) => {
        return (
          dateFormat(d.Timestamp) >=
            dateFormat(new Date(dateRange.startDate).setUTCHours(0)) &&
          dateFormat(d.Timestamp) <=
            dateFormat(new Date(dateRange.endDate).setUTCHours(24))
        );
      });
      setData(filteredData);
      setZoomState([GetMinDate(filteredData), GetMaxDate(filteredData)]);
    }
  }, [dateObj.dateRange]);

  useEffect(() => {
    const dateFormat = (date) => new Date(date).getTime();
    const avgdata = data.filter(
      (d) =>
        dateFormat(d.Timestamp) >= ZoomState[0] &&
        dateFormat(d.Timestamp) <= ZoomState[1]
    );
    setAvgValues(avgdata);
  }, [data, ZoomState]);
  const {
    bloodPressure,
    respiration,
    oxygenSaturation,
    pulse,
    temperature,
    sepsisWatch,
  } = options;
  const { dateRange, isOpen } = dateObj;
  return (
    <Fragment>
      <Grid container spacing={3} className=" bordera">
        <Grid item lg={12} md={12} sm={12} xs={12} className="border-dotted">
          <Card className="border p-4">
            <Typography variant="h5" className="mb-8 font-bold">
              Trends and Report
            </Typography>

            <Grid container spacing={3} className="w-full m-0">
              <Grid item lg={3} md={3} sm={12} xs={12} className=" ">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectAll}
                        value={selectAll}
                        onChange={HandleSelectAll}
                        name="selectAll"
                      />
                    }
                    label="Select All"
                  />
                  <Divider className="pr-4" />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={bloodPressure}
                        onChange={handleChange}
                        name="bloodPressure"
                        color="primary"
                      />
                    }
                    label="Blood Pressure"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={respiration}
                        value={respiration}
                        name="respiration"
                        onChange={handleChange}
                      />
                    }
                    label="Respiration"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={oxygenSaturation}
                        value={oxygenSaturation}
                        name="oxygenSaturation"
                        onChange={handleChange}
                      />
                    }
                    label="Oxygen Saturation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={pulse}
                        checked={pulse}
                        name="pulse"
                        onChange={handleChange}
                      />
                    }
                    label="Pulse"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={temperature}
                        checked={temperature}
                        name="temperature"
                        onChange={handleChange}
                      />
                    }
                    label="Temperature"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={sepsisWatch}
                        checked={sepsisWatch}
                        name="sepsisWatch"
                        onChange={handleChange}
                      />
                    }
                    label="Sepsis Watch"
                  />
                </FormGroup>
              </Grid>
              <Grid item lg={9} md={9} sm={12} xs={12} className="border ">
                <div className="flex justify-end">
                  <Button
                    onClick={() => dateObjHandler("isOpen", true)}
                    color="primary"
                    variant="contained"
                  >
                    {dateRange ? (
                      <span>{`${moment(dateRange.startDate).format(
                        "ll"
                      )}--${moment(dateRange.endDate).format("ll")} `}</span>
                    ) : (
                      "Date Select"
                    )}
                    <Icon>expand_more</Icon>
                  </Button>
                </div>
                <TrendGraph
                  data={data}
                  options={options}
                  sliderZoomState={ZoomState}
                />
              </Grid>
            </Grid>
            <Grid item lg={12} sm={12}>
              <div className="w-full" style={{ paddingLeft: "40%" }}>
                <div className="w-full p-5px">
                  {options.respiration && (
                    <BottomData
                      avgValues={avgValues}
                      value="RR"
                      color="#e31d93"
                    />
                  )}
                  {options.temperature && (
                    <BottomData
                      avgValues={avgValues}
                      value="Temp"
                      color="#e31d1d"
                    />
                  )}
                  {options.pulse && (
                    <BottomData
                      avgValues={avgValues}
                      value="HRM"
                      color="#5f1de3"
                    />
                  )}
                  {options.oxygenSaturation && (
                    <BottomData
                      avgValues={avgValues}
                      value="SPO2"
                      color="#1dcae3"
                    />
                  )}
                  {options.bloodPressure && (
                    <>
                      <BottomData
                        avgValues={avgValues}
                        value="BP_Sys"
                        color="#fb873d"
                      />
                      <BottomData
                        avgValues={avgValues}
                        value="BP_Dia"
                        color="#fb873d"
                      />
                    </>
                  )}
                </div>
              </div>
              <Typography className="inline-block ml-10">
                Timeline Zoom In/Out
              </Typography>
              <Slider
                className="inline-block w-9/12 float-right"
                min={GetMinDate(data)}
                max={GetMaxDate(data)}
                value={ZoomState}
                onChange={handleZoomChange}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <DateRangePickerDialog
        isOpen={isOpen}
        handleClose={() => dateObjHandler("isOpen", false)}
        // dateRange={dateRange}
        dateHandler={(range) => dateObjHandler("dateRange", range)}
      />
    </Fragment>
  );
};

// export default Dashboard;
export default withStyles({}, { withTheme: true })(TrendTab);
const BottomData = ({ avgValues, value, color }) => {
  const GetMinValue = (data, option) => Math.floor(min(data, (d) => d[option]));
  const GetMaxValue = (data, option) => Math.floor(max(data, (d) => d[option]));
  const GetAvgValue = (data, option) =>
    Math.floor(mean(data, (d) => d[option]));
  return (
    <div className="flex justify-between align-center p-5px w-2/5 text-xs">
      <span>
        <span
          className="mr-4px mt-6px min-h-8 min-w-8 absolute"
          style={{ backgroundColor: color }}
        ></span>
        <span className="ml-15px text-xs"> High</span>
      </span>
      <span className="text-xs">{GetMaxValue(avgValues, value)}</span>
      <span>
        <span
          className="mr-4px mt-6px min-h-8 min-w-8 absolute opacity-50"
          style={{ backgroundColor: color }}
        ></span>
        <span className="ml-15px text-xs"> Ave</span>
      </span>
      <span className="text-xs">{GetAvgValue(avgValues, value)}</span>
      <span>
        <span
          className="mr-4px mt-6px min-h-8 min-w-8 absolute opacity-25"
          style={{ backgroundColor: color }}
        ></span>
        <span className="ml-15px text-xs"> Low</span>
      </span>
      <span className="text-xs">{GetMinValue(avgValues, value)}</span>
    </div>
  );
};
