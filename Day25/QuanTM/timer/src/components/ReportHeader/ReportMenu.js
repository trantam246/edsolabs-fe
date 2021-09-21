import React, { useState, useRef } from "react";
import {
  Popover,
  MenuItem,
  FormControl,
  Select,
  makeStyles,
} from "@material-ui/core";

import DateRangePicker from "./DateRangePicker";
import { useReportContext } from "../../pages/Report";

const menu = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "This month",
  "Last month",
  "Date range",
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    flexBasis: "30%",
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function ReportMenu() {
  const classes = useStyles();
  const { selected, setSelected } = useReportContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const formRef = useRef();

  const handleDateRange = (item) => {
    setSelected(item);
    setAnchorEl(formRef.current);
  };
  const handleSelectChange = (item) => {
    setSelected(item);
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.root} ref={formRef}>
        <Select value={selected}>
          {menu.map((item) => {
            let onClick = () => handleSelectChange(item);
            if (item === "Date range") {
              onClick = () => handleDateRange(item);
            }
            return (
              <MenuItem key={item} value={item} onClick={onClick}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Popover
        classes={{
          paper: classes.paper,
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <DateRangePicker />
      </Popover>
    </>
  );
}
