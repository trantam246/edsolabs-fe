import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(3),
    overflow: "scroll",
    overflowY: "hidden",
    [theme.breakpoints.up("md")]: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
}));

export default function TaskListContainer(props) {
  const classes = useStyles();
  return (
    <Box
      p={3}
      pt={7}
      pb={7}
      display="flex"
      flexDirection="column"
      className={classes.root}
    >
      {props.children}
    </Box>
  );
}
