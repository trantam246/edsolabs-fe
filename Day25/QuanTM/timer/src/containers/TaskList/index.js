import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(3),
    minWidth: theme.breakpoints.values.md,
  },
}));

export default function TaskList(props) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      {props.children}
    </Box>
  );
}
