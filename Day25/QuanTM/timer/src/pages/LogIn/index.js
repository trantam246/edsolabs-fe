import React from "react";
import { Box } from "@material-ui/core";

import LogInForm from "../../components/LogInForm";

export default function LogIn() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <LogInForm />
    </Box>
  );
}
