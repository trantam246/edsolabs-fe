import React from "react";
import { Box, Grid, Avatar, Typography, makeStyles } from "@material-ui/core";

import { useGlobalContext } from "../ContextProvider";

const useStyles = makeStyles((theme) => ({
  typo: {
    color: "#d5d7db",
  },
}));

export default function AvatarBar() {
  const classes = useStyles();
  const { user } = useGlobalContext();

  return (
    <Box p={2}>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Avatar src={user.avatar}></Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            component="span"
            nowrap="true"
            className={classes.typo}
          >
            {user.fullname}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
