import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Stack,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { useState } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: "20px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    width: 180,
  },
}));

const DateFilter = ({ getDateFilter, clearDate }) => {
  const classes = useStyles();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleDate = (value) => {
    getDateFilter(moment(value.target.value).format("YYYY-MM-DD"));
  };

  const handleClearDate = () => {
    setDate(moment().format("YYYY-MM-DD"));
    clearDate();
  };

  return (
    <Box display="flex" alignItems="center" pt={3} pl={2}>
      <form className={classes.container} noValidate>
        <TextField
          label="Date Filter"
          type="date"
          color="primary"
          defaultValue={date}
          variant="outlined"
          size="small"
          onChange={handleDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>

      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        color="primary"
        onClick={handleClearDate}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default DateFilter;
