import React from "react";
import { Box } from "@material-ui/core";

export default function ReportContainer(props) {
  return (
    <Box p={3} pt={7} pb={7} display="flex" flexDirection="column">
      {props.children}
    </Box>
  );
}
