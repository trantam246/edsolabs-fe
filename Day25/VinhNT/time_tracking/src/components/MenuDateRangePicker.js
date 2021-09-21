/* eslint-disable no-unused-vars */
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { DateRangePicker } from 'materialui-daterange-picker';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  board: {
    position: 'absolute',
    top: theme.spacing(4),
  },
}));

export default function MenuDateRangePicker(props) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleChange = (range) => {
    setDateRange(range);
    props.update(range);
  };
  const toggle = () => setOpen(!open);
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Button onClick={handleOpen}>Choose date range</Button>
      <DateRangePicker
        className={classes.board}
        open={open}
        toggle={toggle}
        onChange={(range) => handleChange(range)}
      />
    </div>
  );
}
