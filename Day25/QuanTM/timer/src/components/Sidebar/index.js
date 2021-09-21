import React from "react";
import { Drawer as MUIDrawer, makeStyles, Divider } from "@material-ui/core";

import AvatarBar from "./AvatarBar";
import Links from "./Links";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[800],
  },
}));

export default function SideBar() {
  const classes = useStyles();

  return (
    <MUIDrawer variant="permanent" classes={{ paper: classes.paper }}>
      <AvatarBar />
      <Divider />
      <Links />
    </MUIDrawer>
  );
}
