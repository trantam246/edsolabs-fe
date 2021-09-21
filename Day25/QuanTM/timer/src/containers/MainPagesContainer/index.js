import React from "react";
import { Box } from "@material-ui/core";

import { drawerWidth } from "../../components/Sidebar/Links";

export default function MainPagesContainer(props) {
  return <Box pl={drawerWidth / 8}>{props.children}</Box>;
}
