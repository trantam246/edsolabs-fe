import { Box, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    width: 180,
  },
}));

const DateFilter = () => {
  const classes = useStyles();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  return (
    <Box display="flex" alignItems="center" pt={3} pl={2}>
      <Typography variant="body1" gutterBottom>
        Date filter
      </Typography>

      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          color="secondary"
          defaultValue={date}
          variant="outlined"
          size="small"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </Box>
  );
};

export default DateFilter;
